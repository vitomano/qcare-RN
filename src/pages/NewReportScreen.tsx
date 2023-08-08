import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, StyleSheet } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { StackScreenProps } from '@react-navigation/stack';
import { LoadingScreen } from './LoadingScreen';
import { PalletState } from '../interfaces/intakes.reports';

import ButtonStyled from '../components/ui/ButtonStyled';

import { FRUITS } from '../data/selects';
import { PickerModal } from '../components/modals/PickerModal';
import { CentredContent } from '../components/CenterContent';
import { AddPalletButton } from '../components/AddPalletButton';
import { TextApp } from '../components/ui/TextApp';

import { CreateStackParams } from '../navigation/CreateStack';
import { CreateContext } from '../context/CreateContext';
import { PalletNewReport } from '../components/PalletNewReport';
import { validationPrereport } from '../helpers/validations';
import { alertMsg } from '../helpers/alertMsg';
import qcareApi from '../api/qcareApi';
import { average } from '../helpers/average';
import { greenMain } from '../theme/variables';
import { useQueryClient } from '@tanstack/react-query';
import { MainForm } from '../components/MainForm';


interface Props extends StackScreenProps<CreateStackParams, "NewReportScreen"> { };

export const NewReportScreen = ({ route, navigation }: Props) => {

  const { isLoading, mainData, pallets, fruit, getMainDataNew, handleFruit, cleanAll, setNewPallets } = useContext(CreateContext)

  const queryClient = useQueryClient()

  const [modalFruit, setModalFruit] = useState(false)
  const [sending, setSending] = useState(false)
  const [comments, setComments] = useState<string>(`The results contained within this report were obtained from random samples taken throughout the delivery. Progressive defects that are present may exceed the eventual defect level specified. Sampling does not represents 100% of the real Quality and condition of the fruit and it is only an approximation to reality.
    
  If, or on further processing, the product requires further selection to meet the customer specification, you will be informed of any losses in due course. However, if you would like the product returned or dealt with in any other manner please contact the relevant commercial contact within Growers Packers.`)


  useEffect(() => {
    getMainDataNew(route.params.fruit)
    return () => cleanAll()
  }, [route.params.fruit])



  const sendPrereport = async () => {

    const { error, ok } = validationPrereport(mainData!)

    if (!ok) return alertMsg("Error to send", error)

    if (pallets?.some(pall => pall.score === "0")) return alertMsg("Error to send", "Score is not selected")

    setSending(true)

    try {

      let newPallets = []

      for (let i = 0; i < pallets.length; i++) {

        const details = {
          labels: (pallets[i].labels.filter(a => a.check === true)).map(app => { const { check, ...rest } = app; return rest }),
          appareance: (pallets[i].appareance.filter(a => a.check === true)).map(app => { const { check, ...rest } = app; return rest }),
          pallgrow: (pallets[i].pallgrow.filter(p => p.check === true)).map(pall => { const { check, ...rest } = pall; return rest }),
        }

        newPallets.push({
          pid: pallets[i].id,
          prereport: null,
          details,
          score: pallets[i].score,
          images: [],
          addGrower: (pallets[i] as PalletState).addGrower || (pallets[i] as PalletState).newGrower || null,
        })
      }

      await qcareApi.post(`/report/report`, {
        mainData,
        fruit,
        averageScore: average('score', pallets) || "0",
        pallets: newPallets,
        commentsForm: comments,
        formatGr: Number(mainData?.format_gr) || "0"
      })

        .then(async (res) => {

          const savePalletInfo = async () => {

            const repId = res.data.rid

            for (const pall of pallets) {

              const formData = new FormData();

              for (const img of pall.images) {
                formData.append('uploady', img)
              }

              formData.append('repId', repId)
              formData.append('palletId', pall.id)

              await qcareApi.post('/report/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
            }
          };

          const saveLifeTest = async () => {
            const allGrowers = (pallets as PalletState[]).filter(p => p.newGrower).map(p => { return { grower: p?.newGrower?.grower_variety, score: p.score } })
            const growers = allGrowers.length > 0 ? allGrowers : [{ grower: (mainData?.grower || "--"), score: average("score", pallets) }]

            for (const gro of growers) {
              await qcareApi.post('/life-test/create-life-test', {
                reportId: res.data.rid,
                grower: gro.grower,
                score: gro.score,
                palletRef: mainData?.pallet_ref || "--"
              })
            }
          }

          await Promise.all([savePalletInfo(), saveLifeTest()])

        })
        
      queryClient.resetQueries((['reports']))
      queryClient.resetQueries((['lifeTests']))

      cleanAll()
      navigation.navigate("NewReportSelectScreen" as any)


    } catch (error) {
      console.log(error)
      alertMsg("Error", 'Something went wrong')

    } finally { setSending(false) }
  };

  if (sending) return (
    <LoadingScreen text='Creating Report...' />
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
                      createNew
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
                          <PalletNewReport
                            key={pallet.id}
                            pallet={pallet as PalletState}
                            i={i} />
                        ))
                        : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
                    }

                    <AddPalletButton
                      title='Add Pallet'
                      handlePress={setNewPallets}
                    />

                    <View style={{ marginVertical: 20 }}>
                      <TextApp bold style={{ marginBottom: 10 }}>Comments</TextApp>
                      <TextInput
                        style={styles.textArea}
                        multiline={true}
                        value={comments}
                        onChangeText={(e) => setComments(e)}
                      />
                    </View>

                    <CentredContent style={{ marginVertical: 20 }}>
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


const styles = StyleSheet.create({
  textArea: {
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    borderRadius: 10,
    borderColor: greenMain,
    borderWidth: 1,
    backgroundColor: "transparent",
  }
});