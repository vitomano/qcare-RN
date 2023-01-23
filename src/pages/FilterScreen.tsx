import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { View, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native'
import { useFilterReports } from '../api/useFilterReports';
import { CardReport } from '../components/cards/CardReport';
import { CentredContent } from '../components/CenterContent';
import ButtonStyled from '../components/ui/ButtonStyled';
import { TextApp } from '../components/ui/TextApp';
import { FilterContext } from '../context/FilterContext';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';
import { filterRed } from '../theme/variables';

interface Props extends StackScreenProps<ReportsStackParams, "FilterScreen"> { };

export const FilterScreen = ({ route, navigation }: Props) => {

  const { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, reports } = useFilterReports(route.params.query)
  const { cleanAll } = useContext(FilterContext)

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
          <View style={{ marginBottom: 60 }}>

            <View style={{ marginBottom: 5, marginRight: 10, alignSelf: "flex-end" }}>
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  cleanAll()
                  navigation.navigate("ReportsScreen")
                }}
              >
                <View style={ styles.closeBtn }>
                  <TextApp size='s' color='white'>Clean filter</TextApp>
                  {/* <Icon name="close" size={20} color="white" /> */}
                </View>
              </TouchableOpacity>
            </View>

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
                  text={isFetchingNextPage ? "Loading..." : 'Load more'}
                  blue
                  width={50}
                  onPress={fetchNextPage}
                  loading={isFetchingNextPage}
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

const styles = StyleSheet.create({
    closeBtn:{
      backgroundColor: filterRed,
      flexDirection: "row",
      alignItems: "center",
      padding: 3,
      paddingHorizontal: 6,
      borderRadius: 50
    }
});