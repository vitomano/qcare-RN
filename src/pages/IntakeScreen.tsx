import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { StackScreenProps } from '@react-navigation/stack';
import { IntakesStackParams } from '../navigation/IntakesStack';
import { LoadingScreen } from './LoadingScreen';
import { DataPrereport, ObjectType } from '../interfaces/intakes.reports';

import { MainForm } from '../components/MainForm';
import ButtonStyled from '../components/ui/ButtonStyled';

import { FRUITS } from '../data/selects';
import { PickerModal } from '../components/modals/PickerModal';
import { IntakeContext } from '../context/IntakeContext';
import { CentredContent } from '../components/CenterContent';
import { AddPalletButton } from '../components/AddPalletButton';
import { TextApp } from '../components/ui/TextApp';
import { validationPrereport } from '../helpers/validations';
import { alertMsg } from '../helpers/alertMsg';
import { average } from '../helpers/average';
import qcareApi from '../api/qcareApi';
import { PalletIntake } from '../components/PalletIntake';
import { DateSelector } from '../components/DateSelector';
import { Discrepancies } from '../components/Discrepancies';
import { photoToUpload, uploadPhoto } from '../helpers/photoToUpload';
import { useQueryClient } from '@tanstack/react-query';


interface Props extends StackScreenProps<IntakesStackParams, "IntakeScreen"> { };

export const IntakeScreen = ({ route, navigation }: Props) => {

  const { isLoading, mainData, pallets, fruit, team, getMainData, handleFruit, cleanAll, setNewPallets } = useContext(IntakeContext)

  const [modalFruit, setModalFruit] = useState(false)
  const [sending, setSending] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)

  const [openArrival, setOpenArrival] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)

  const [arrivalDate, setArrivalDate] = useState<Date>(new Date())
  const [loadingDate, setLoadingDate] = useState<Date>(new Date())

  const [discrepancies, setDiscrepancies] = useState<ObjectType | null>(null)

  const queryClient = useQueryClient()


  useEffect(() => {
    setStartDate(new Date())
  }, [])

  useEffect(() => {
    getMainData(route.params.id)
    return () => cleanAll()
  }, [route.params.id])


  const sendPrereport = async () => {

    const { error, ok } = validationPrereport(mainData!, pallets as DataPrereport[])

    if (!ok) return alertMsg("Error to send", error)

    setSending(true)

    try {
      let newPallets = []

      for (let grower of pallets as DataPrereport[]) {

        const details = {
          labels: (grower.labels.filter(p => p.check === true)).map(lab => { const { check, ...rest } = lab; return rest }),
          appareance: (grower.appareance.filter(p => p.check === true)).map(app => { const { check, ...rest } = app; return rest }),
        }

        newPallets.push({
          pid: grower.id,
          details,
          score: grower.score,
          grade: grower.grade,
          action: grower.action,
          images: [],
          addGrower: grower?.newGrower || null,
        })
      }


      await qcareApi.post(`/prereport/main-prereport`, {
        mainData: { ...mainData, "loading_date": loadingDate, "arrival_date": arrivalDate },
        discrepancies,
        fruit,
        pid: route.params.id,
        averageScore: average('score', pallets as DataPrereport[]) || "0",
        averageGrade: average('grade', pallets as DataPrereport[]) || "0",
        averageAction: average('action', pallets as DataPrereport[]) || "0",
        startDate: startDate,
        endDate: new Date(),
        pallets: newPallets,
        team: team || null,
      })

      .then(async (res) => {

        const preId = res.data.preId
        const files = photoToUpload(preId, pallets)

        if (files.length > 0) {
            const uploadPromises = files.map(file => uploadPhoto(file, true));
            await Promise.all(uploadPromises)
        }

        return preId
    })

        .then(async (res) => {

          const preId = res

          for (let i = 0; i < pallets.length; i++) {

            if (pallets[i].images.length === 0) { continue; }

            const formData = new FormData();

            pallets[i].images.map(image => {
              formData.append("uploady", image);
            });

            formData.append('preId', preId)
            formData.append('palletId', pallets[i].id)

            await qcareApi.post('/prereport/images-prereport', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })

          }
        })

        await queryClient.invalidateQueries(['intakes'])
        await queryClient.invalidateQueries(['prereports'])

      navigation.navigate('IntakesScreen' as never)

    } catch (error) {
      console.log(error)
    } finally {
      setSending(false)
    }
  };

  if (sending) return (
    <LoadingScreen text='Creating Pre Report...' />
  )

  return (
    <>
      {
        isLoading
          ? <LoadingScreen />
          :
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView style={{ ...globalStyles.containerFlex }}>

              <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50 }}>
                {
                  mainData &&
                  <>
                    <MainForm
                      mainData={mainData}
                    />

                    {/* ------------------------------------ */}

                    <DateSelector
                      label='Loading Date'
                      date={loadingDate}
                      setDate={setLoadingDate}
                      open={openLoading}
                      setOpen={setOpenLoading}
                    />

                    <DateSelector
                      label='Arrival Date'
                      date={arrivalDate}
                      setDate={setArrivalDate}
                      open={openArrival}
                      setOpen={setOpenArrival}
                    />

                    <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                      <TextApp style={{ width: "50%" }}>Fruit</TextApp>

                      <PickerModal
                        modal={modalFruit}
                        openModal={setModalFruit}
                        LIST={FRUITS}
                        setState={handleFruit}
                        state={fruit}
                      />
                    </View>

                    <Discrepancies
                      discrepancies={discrepancies}
                      setDiscrepancies={setDiscrepancies}
                      mainData={mainData}
                    />

                    {/* ------------------------------------ */}

                    {
                      pallets.length > 0
                        ? pallets.map((pallet, i) => (
                          <PalletIntake
                            key={pallet.id}
                            pallet={pallet as DataPrereport}
                            i={i} />
                        ))
                        : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
                    }

                    <AddPalletButton
                      title='Add Pallet'
                      handlePress={setNewPallets}
                    />

                    <CentredContent>
                      <ButtonStyled
                        text='Send'
                        width={50}
                        onPress={sendPrereport}
                      />
                    </CentredContent>
                  </>
                }
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
      }
    </>
  )
}
