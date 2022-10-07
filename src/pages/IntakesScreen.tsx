import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { ReportContext } from '../context/ReportContext'
import { CardReport } from '../components/CardReport';
import { globalStyles } from '../theme/globalStyles'

export const IntakesScreen = () => {

  const { getAllReports, allReports } = useContext(ReportContext)

  useEffect(() => {
    getAllReports()
  }, [])

  return (

    <View
      style={globalStyles.containerFlex}
    >
      <Text>
        Intakes
      </Text>
    </View>


  )
}