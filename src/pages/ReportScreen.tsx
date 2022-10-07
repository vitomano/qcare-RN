import React from 'react'
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { useReport } from '../hooks/useReport';
import { TextTitle } from '../components/ui/TextTitle';
import { ReportMain } from '../components/ReportMain';
import { bgColor, greenMain } from '../theme/variables';
import { ReportPallet } from '../components/ReportPallet';


interface Props extends StackScreenProps<ReportsStackParams, "ReportScreen"> { };

export const ReportScreen = ({ route }: Props) => {

  const { isLoading, mainData, date, pallets, comments } = useReport(route.params.id)


  return (

    <>
      {
        isLoading
          ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator
                color={'#000'}
                size={50}
              />
            </View>
          )
          :
          <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={{ backgroundColor: greenMain, paddingHorizontal: 20, alignItems: 'center' }}>
              <TextTitle style={{ color: '#fff', marginTop: 10 }}>{mainData.pallet_ref}</TextTitle>

              <View style={{backgroundColor: '#fff', borderRadius: 120, marginBottom: 20, marginTop:10, paddingHorizontal: 10, paddingVertical:2}}>
                <Text style={{ marginVertical: 4, fontWeight:'bold' }}>{new Date(date as any).toLocaleDateString() || "--"}</Text>
              </View>
              
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <ReportMain mainData={mainData} />
            </View>

            {
              pallets.length > 0
                ? <ReportPallet pallets={pallets} />
                : <Text>No Pallets</Text>
            }

            <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 50 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Comments</Text>
              <Text>{comments}</Text>
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