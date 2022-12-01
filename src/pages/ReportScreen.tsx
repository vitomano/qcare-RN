import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { useFetchReport } from '../hooks/useFetchReport';
import { ReportMain } from '../components/ReportMain';
import { greenMain } from '../theme/variables';
import { ReportPallet } from '../components/ReportPallet';
import { globalStyles } from '../theme/globalStyles';
import { LoadingScreen } from './LoadingScreen';
import { TextApp } from '../components/ui/TextApp';


interface Props extends StackScreenProps<ReportsStackParams, "ReportScreen"> { };

export const ReportScreen = ({ route }: Props) => {

  const { isLoading, mainData, date, pallets, comments } = useFetchReport(route.params.id)

  return (

    <>
      {
        isLoading
          ? <LoadingScreen />
          :
          <ScrollView style={{ ...globalStyles.containerFlex }} >
            <View style={{ backgroundColor: greenMain, paddingHorizontal: 20, alignItems: 'center' }}>
              <TextApp color='white' bold size='l' style={{ marginTop: 10 }}>{mainData.pallet_ref}</TextApp>

              <View style={{ backgroundColor: '#fff', borderRadius: 120, marginBottom: 20, marginTop: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
                <TextApp bold size='s' style={{ marginVertical: 4 }}>{new Date(date as any).toLocaleDateString() || "--"}</TextApp>
              </View>

            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <ReportMain mainData={mainData} />
            </View>

            {
              pallets.length > 0
                ? <ReportPallet pallets={pallets} />
                : <TextApp bold>No Pallets</TextApp>
            }

            <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 50 }}>
              <TextApp bold style={{ marginBottom: 10 }}>Comments</TextApp>
              <TextApp size='s'>{comments}</TextApp>
            </View>

          </ScrollView>
      }
    </>

  )
}


const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});