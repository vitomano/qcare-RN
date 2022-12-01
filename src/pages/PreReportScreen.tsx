import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native'
import qcareApi from '../api/qcareApi'
import { PalletPrereport } from '../components/PalletPrereport'
import { ReportMain } from '../components/ReportMain'
import { TextApp } from '../components/ui/TextApp'
import { duration } from '../helpers/dateFormat'

import { SinglePreReportResponse, PrereportPallet, MainInfo } from '../interfaces/intakes.reports';
import { PreReportsStackParams } from '../navigation/PrereportsStack'
import { globalStyles } from '../theme/globalStyles'
import { blue } from '../theme/variables'
import { LoadingScreen } from './LoadingScreen'

interface Props extends StackScreenProps<PreReportsStackParams, "PreReportScreen"> { };


export const PreReportScreen = ({ route, navigation }: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [pallets, setPallets] = useState<PrereportPallet[]>([])
  const [mainData, setMainData] = useState<MainInfo | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {

    setIsLoading(true)
    fetchData()

    return () => { setIsLoading(false) }

  }, [route.params.id])

  const fetchData = async () => {
    try {
      const { data } = await qcareApi.get<SinglePreReportResponse>(`/prereport/${route.params.id}`)

      setPallets(data.singlePreReport.pallets)
      setMainData(data.singlePreReport.mainData)
      setStartDate(data.singlePreReport.startDate)
      setEndDate(data.singlePreReport.endDate)

    } catch (error) { console.log(error)
    } finally { setIsLoading(false) }
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

              <View style={{ backgroundColor: blue, paddingHorizontal: 20, alignItems: 'center' }}>
                <TextApp color='white' bold size='l' style={{ marginTop: 10 }}>{mainData?.pallet_ref || "--"}</TextApp>

                <View style={{ backgroundColor: '#fff', borderRadius: 120, marginTop: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
                  <TextApp bold size='s' style={{ marginVertical: 4 }}>{new Date(endDate).toLocaleDateString() || "--"}  |  {new Date(endDate).getHours() + ":" + new Date(endDate).getMinutes() || "--"}</TextApp>
                </View>
                <TextApp bold color='white' size='s' style={{ marginVertical: 4, marginBottom: 20 }}>duration: {duration(startDate, endDate)} min</TextApp>

              </View>

              <View style={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 50 }}>
                {
                  mainData &&
                  <ReportMain mainData={mainData} />
                }
                {
                  pallets.length > 0

                    ? pallets.map((pallet, i) => (
                      <PalletPrereport
                        key={pallet.pid}
                        pallet={pallet as PrereportPallet}
                        i={i}
                        repId={route.params.id}
                        fetchData={fetchData}
                      // refresh={refresh}
                      // setRefresh={setRefresh}
                      />
                    ))
                    : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
                }
              </View>


            </ScrollView>
          </KeyboardAvoidingView>
      }
    </>


  )
}