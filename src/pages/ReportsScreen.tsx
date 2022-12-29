import React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useReports } from '../api/useReports';
import { CardReport } from '../components/cards/CardReport';
import { CentredContent } from '../components/CenterContent';
import ButtonStyled from '../components/ui/ButtonStyled';
import { TextApp } from '../components/ui/TextApp';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';

export const ReportsScreen = () => {

  const { isLoading, hasNextPage, fetchNextPage, refetch, reports } = useReports()

  if (isLoading) return <LoadingScreen />

  return (

    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }
      style={{ ...globalStyles.container, paddingTop: 10, paddingHorizontal: 10 }}>
      {
        reports.length > 0
          ?
          <View style={{marginBottom: 60}}>
            {

              reports.map(report => (
                <CardReport
                  key={report._id}
                  report={report} />
              ))
            }
            {
              hasNextPage &&
              <CentredContent style={{ marginTop: 30 }}>
                <ButtonStyled
                  text='Load more'
                  blue
                  width={50}
                  onPress={fetchNextPage}
                />
              </CentredContent>
            }
          </View>

          :
          <View style={{ marginVertical: 50 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Reports</TextApp>
          </View>
      }
     
    </ScrollView>


  )
}