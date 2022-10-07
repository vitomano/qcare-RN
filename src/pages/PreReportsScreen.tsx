import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { ReportContext } from '../context/ReportContext'
import { globalStyles } from '../theme/globalStyles'

export const PreReportsScreen = () => {

  const { getAllReports, allReports } = useContext(ReportContext)

  useEffect(() => {
    getAllReports()
  }, [])

  return (

    <View
      style={globalStyles.containerFlex}
    >
      <Text>
      Pre Reports
      </Text>
    </View>


  )
}