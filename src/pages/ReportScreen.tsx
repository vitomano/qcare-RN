import React from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { ReportMain } from '../components/ReportMain';
import { greenMain } from '../theme/variables';
import { PalletReport } from '../components/PalletReport';
import { globalStyles } from '../theme/globalStyles';
import { LoadingScreen } from './LoadingScreen';
import { TextApp } from '../components/ui/TextApp';
import { useReport } from '../api/useReport';


interface Props extends StackScreenProps<ReportsStackParams, "ReportScreen"> { };

export const ReportScreen = ({ route }: Props) => {

  const { isLoading, data, refetch } = useReport(route.params.id)

  if (isLoading) return <LoadingScreen />

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            style={{ backgroundColor: greenMain }}
          />
        }
        style={{ ...globalStyles.containerFlex }}>

        <View style={{ backgroundColor: greenMain, paddingHorizontal: 20, alignItems: 'center' }}>
          <TextApp color='white' bold size='l' style={{ marginTop: 10 }}>{data?.mainData.pallet_ref || "--"}</TextApp>

          <View style={{ backgroundColor: '#fff', borderRadius: 120, marginBottom: 20, marginTop: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
            <TextApp bold size='s' style={{ marginVertical: 4 }}>{new Date(data?.date as any).toLocaleDateString() || "--"}</TextApp>
          </View>

        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 50 }}>
          {
            data?.mainData &&
            <ReportMain mainData={data.mainData} />
          }

          {
            data?.pallets && data.pallets.length > 0

              ? data?.pallets.map((pallet, i) => (
                <PalletReport key={pallet.pid} pallet={pallet} repId={route.params.id} i={i}/>
              ))
              : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
          }



          <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 50 }}>
            <TextApp bold style={{ marginBottom: 10 }}>Comments</TextApp>
            <TextApp size='s'>{data?.comments || "no comments"}</TextApp>
          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  )
}


