import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { ReportContext } from '../context/ReportContext'
import { CardReport } from '../components/CardReport';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';

export const ReportsScreen = () => {

  const { getAllReports, allReports } = useContext(ReportContext)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading( true )
    try {
      getAllReports()
    } catch (error) {
      throw new Error('Something went wrong')
    } finally { setIsLoading( false )
    }
  }, [])

  if(isLoading) return <LoadingScreen />


  return (

    <View
      style={globalStyles.container}
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