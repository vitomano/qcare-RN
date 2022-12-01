import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { StackScreenProps } from '@react-navigation/stack';
import { IntakesStackParams } from '../navigation/IntakesStack';
import { LoadingScreen } from './LoadingScreen';
import { DataPrereport } from '../interfaces/intakes.reports';

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


interface Props extends StackScreenProps<IntakesStackParams, "IntakeScreen"> { };

export const IntakeScreen = ({ route, navigation }: Props) => {

  const { isLoading, mainData, pallets, fruit, getMainData, handleFruit, cleanAll, setNewPallets } = useContext(IntakeContext)

  const [modalFruit, setModalFruit] = useState(false)
  const [sending, setSending] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)


  useEffect(() => {
    setStartDate(new Date())
  }, [])

  useEffect(() => {
    getMainData(route.params.id)
    return () => cleanAll()
  }, [route.params.id])


  const sendPrereport = async () => {

    const { error, ok } = validationPrereport(mainData!, pallets)

    if (!ok) return alertMsg("Error to send", error)

    setSending(true)

    try {
      let newPallets = []

      for (let grower of pallets) {

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
        mainData,
        fruit,
        pid: route.params.id,
        averageScore: average('score', pallets) || "0",
        averageGrade: average('grade', pallets) || "0",
        averageAction: average('action', pallets) || "0",
        startDate: startDate,
        endDate: new Date(),
        pallets: newPallets
      })

        .then(async (res) => {

          const preId = res.data.preId

          for (let i = 0; i < pallets.length; i++) {

            const formData = new FormData();

            for (const img of pallets[i].images) {
              formData.append('uploady', img)
            }

            formData.append('preId', preId)
            formData.append('palletId', pallets[i].id)

            await qcareApi.post('/prereport/images-prereport', formData)
          }
        })

      navigation.navigate('ReportsScreen' as never)

    } catch (error) {
      console.log(error)
      console.log('Salió mal')
    } finally {
      setSending(false)
    }



  };

  if (sending) return (
    <LoadingScreen text='Uploading Pre Report...' />
  )

  return (
    <>
      {
        isLoading
          ? <LoadingScreen />
          :
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}
          >

            <ScrollView style={{ ...globalStyles.containerFlex }}>

              <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50}}>
                {
                  mainData &&
                  <>
                    <MainForm
                      mainData={mainData}
                    />

                    {/* ------------------------------------ */}

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
