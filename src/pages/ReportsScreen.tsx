import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { Container } from '../components/Container'
import { TitleApp } from '../components/TitleApp'
import { ReportContext } from '../context/ReportContext'
import { CardReport } from '../components/CardReport';
import { globalStyles } from '../theme/globalStyles'

export const ReportsScreen = () => {

  const { getAllReports, allReports } = useContext(ReportContext)

  useEffect(() => {
    getAllReports()
  }, [])

  return (

    <View
      style={globalStyles.containerFlex}
    >
      <FlatList
        style={{ width: '100%', height: '100%', padding: 10 }}
        nestedScrollEnabled={true}
        data={allReports}
        keyExtractor={(report) => report._id}
        renderItem={({ item }) => <CardReport report={item}/> }

        showsVerticalScrollIndicator={false}
      />
    </View>


  )
}