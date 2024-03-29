import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { usePrereport } from '../api/usePrereport'
import { AddPalletButton } from '../components/AddPalletButton'
import { ModalBlock } from '../components/modals/ModalBlock'
import { NewPallet } from '../components/modals/NewPallet'
import { PalletPrereport } from '../components/PalletPrereport'
import { ReportMain } from '../components/ReportMain'
import ButtonStyled from '../components/ui/ButtonStyled'
import { TextApp } from '../components/ui/TextApp'
import { IntakeContext } from '../context/IntakeContext'
import { dateFormat, duration } from '../helpers/dateFormat'

import { PrereportPallet } from '../interfaces/intakes.reports';
import { PreReportsStackParams } from '../navigation/PrereportsStack'
import { globalStyles } from '../theme/globalStyles'
import { blue } from '../theme/variables'
import { LoadingScreen } from './LoadingScreen'
import { Discrepancies } from '../components/Discrepancies'
import { useQueryClient } from '@tanstack/react-query'

interface Props extends StackScreenProps<PreReportsStackParams, "PreReportScreen"> { };


export const PreReportScreen = ({ route, navigation }: Props) => {

  const { isLoading, data, isError, refetch } = usePrereport(route.params.id)
  const { cleanAll } = useContext(IntakeContext)

  const queryClient = useQueryClient()

  const [modalAddPallet, setModalAddPallet] = useState(false)

  //-----------------------------------------------------------------------

  const getOut = async() => {
    await queryClient.invalidateQueries(['prereports'])
    navigation.navigate('PreReportsScreen' as never)
  };

  if (isError) getOut()
  
  if (isLoading) return <LoadingScreen />

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      {
        data &&
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              style={{ backgroundColor: blue }}
            />
          }
          style={{ ...globalStyles.containerFlex }}>


          <View style={{ backgroundColor: blue, paddingHorizontal: 20, alignItems: 'center' }}>
            <TextApp color='white' bold size='l' style={{ marginTop: 10 }}>{data?.mainData?.pallet_ref || "--"}</TextApp>

            <View style={{ backgroundColor: '#fff', borderRadius: 120, marginTop: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
              <TextApp bold size='s' style={{ marginVertical: 4 }}>{dateFormat(data?.endDate) || "--"}  |  {new Date(data?.endDate as any).getHours() + ":" + new Date(data?.endDate as any).getMinutes() || "--"}</TextApp>
            </View>
            <TextApp bold color='white' size='s' style={{ marginVertical: 4, marginBottom: 20 }}>duration: {duration(data?.startDate, data?.endDate)} min</TextApp>

          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 50 }}>
            {
              data &&
              <View style={{ marginBottom: 5 }}>
                <ReportMain mainData={data.mainData} />

                <Discrepancies
                  discrepancies={data.discrepancies}
                  mainData={data.mainData}

                  reportId={data._id}
                  dbDiscrepancy
                  prereport
                />

              </View>
            }
            {
              data.pallets && data.pallets.length > 0

                ? data.pallets.map((pallet, i) => (
                  <PalletPrereport
                    key={pallet.pid}
                    pallet={pallet as PrereportPallet}
                    i={i}
                    repId={route.params.id}
                  />
                ))
                : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
            }

            {/* <AddPalletButton
              title='Add Pallet'
              handlePress={() => {
                cleanAll()
                setModalAddPallet(true)
              }}
            /> */}

            <ModalBlock
              modal={modalAddPallet}
              openModal={setModalAddPallet}
            >
              <NewPallet
                grower={(data?.pallets!).some(pall => pall.addGrower !== null)}
                openModal={setModalAddPallet}
                repId={route.params.id}
              />
            </ModalBlock>


            <ButtonStyled
              style={{ marginVertical: 20 }}
              text='Finish Report'
              blue
              onPress={() => navigation.navigate('PreReportFinishScreen' as never, { id: route.params.id } as never)}
            />

          </View>

        </ScrollView>
      }
    </KeyboardAvoidingView>

  )
}