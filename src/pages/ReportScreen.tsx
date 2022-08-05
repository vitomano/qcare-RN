import React from 'react'
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { useReport } from '../hooks/useReport';
import { TextTitle } from '../components/ui/TextTitle';
import { ReportMain } from '../components/ReportMain';

interface Props extends StackScreenProps<ReportsStackParams, "ReportScreen"> { };

export const ReportScreen = ({ route }: Props) => {

  const { isLoading, mainData, date, score, pallets } = useReport(route.params.id)


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
          <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
            <TextTitle>{mainData.pallet_ref}</TextTitle>
            <Text style={{ marginTop: 4, marginBottom: 20 }}>{new Date(date as any).toLocaleDateString() || "--"}</Text>

            <ReportMain mainData={mainData} />
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