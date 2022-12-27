import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, StyleSheet } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { StackScreenProps } from '@react-navigation/stack';
import { LoadingScreen } from './LoadingScreen';
import { DataPrereport, DataReports, PalletState } from '../interfaces/intakes.reports';

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
import { PreReportsStackParams } from '../navigation/PrereportsStack';
import { ReportMain } from '../components/ReportMain';
import { PalletFinishReport } from '../components/PalletFinishReport';
import { inputStyles } from '../theme/inputStyles';
import { greenMain } from '../theme/variables';
import { ModalBlock } from '../components/modals/ModalBlock';
import { ModalLoading } from '../components/modals/ModalLoading';


interface Props extends StackScreenProps<PreReportsStackParams, "PreReportFinishScreen"> { };

export const PreReportFinishScreen = ({ route, navigation }: Props) => {

  const { isLoading, mainData, pallets, fruit, getMainDataReport, handleFruit, cleanAll } = useContext(IntakeContext)

  const [startDate, setStartDate] = useState<Date | null>(null)

  const [sending, setSending] = useState(false)

  const [comments, setComments] = useState<string>(`The results contained within this report were obtained from random samples taken throughout the delivery. Progressive defects that are present may exceed the eventual defect level specified. Sampling does not represents 100% of the real Quality and condition of the fruit and it is only an approximation to reality.
    
  If, or on further processing, the product requires further selection to meet the customer specification, you will be informed of any losses in due course. However, if you would like the product returned or dealt with in any other manner please contact the relevant commercial contact within Growers Packers.`)

  // const comments = 

  useEffect(() => {
    setStartDate(new Date())
  }, [])

  useEffect(() => {
    getMainDataReport(route.params.id)
    return () => cleanAll()
  }, [route.params.id])


  const handleSend = async () => {

    // const awaite = new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(console.log("SE ESTA", enviando ? "true" : "false"))
    //   }, 5000);
    // })

    // try {

    //   await awaite

    // } catch (error) {
    //   console.log(error)
    // } finally { setEnviando(false) }

    if (pallets.some(pallet => (pallet.pallgrow[0].valor as string).trim() === "")) {
      return alertMsg("Error to send", `"Weight 10 Fruits" value is missing`)
    }

    setSending(true)

    try {

      let newPallets = []

      for (let i = 0; i < pallets.length; i++) {

        const details = {
          appareance: (pallets[i].appareance.filter(a => a.check === true)).map(app => { const { check, ...rest } = app; return rest }),
          pallgrow: (pallets[i].pallgrow.filter(p => p.check === true)).map(pall => { const { check, ...rest } = pall; return rest }),
        }

        newPallets.push({
          pid: pallets[i].id,
          prereport: (pallets[i] as PalletState).prereport,
          details,
          score: pallets[i].score,
          images: [],
          addGrower: (pallets[i] as PalletState).addGrower || (pallets[i] as DataReports).newGrower || null,
        })
      }


      await qcareApi.post(`/report/report`, {
        mainData,
        fruit,
        pid: route.params.id,
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
                headers: { 'Content-Type': 'multipart/form-data' }})
            }
          };

          const saveLifeTest = async () => {
            const allGrowers = (pallets as PalletState[]).filter(p => p.addGrower).map(p => { return { grower: p?.addGrower?.grower_variety, score: p.score } })
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
      // toast.success('Report sent successfully')
      navigation.navigate("ReportsScreen" as any)


    } catch (error) {
      console.log(error)
      alertMsg("Error", 'Something went wrong')

    } finally { setSending(false) }

  }


  return (
    <>
      {
        isLoading
          ? <LoadingScreen />
          :
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >

            <ScrollView style={{ ...globalStyles.containerFlex }}>

              <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50 }}>
                {
                  mainData &&
                  <>
                    <ReportMain mainData={mainData} />

                    {/* ------------------------------------ */}

                    {
                      pallets.length > 0
                        ? pallets.map((pallet, i) => (
                          <PalletFinishReport
                            key={pallet.id}
                            pallet={pallet as PalletState}
                            i={i} />
                        ))
                        : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
                    }

                    {/* ------------------------------------ */}

                    {/* <AddPalletButton
                      title='Add Pallet'
                      handlePress={setNewPallets}
                    /> */}

                    <View style={{ marginVertical: 20 }}>
                      <TextApp bold style={{ marginBottom: 10 }}>Comments</TextApp>
                      <TextInput
                        style={styles.textArea}
                        multiline={true}
                        value={comments}
                        onChangeText={(e) => setComments(e)}
                      />
                    </View>

                    <CentredContent>
                      <ButtonStyled
                        text='Create Report'
                        width={60}
                        onPress={() => handleSend()}
                      />
                    </CentredContent>

                    <ModalLoading
                      modal={sending}
                      text='Uploading Report...'
                    />

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