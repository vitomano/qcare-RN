import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import qcareApi from '../api/qcareApi'
import { CardPrereport } from '../components/cards/CardPrereport'
import { TextTitle } from '../components/ui/TextTitle'
import { Prereport, PrereportsResponse } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen'

export const PreReportsScreen = () => {

  const [preReports, setPreReports] = useState<Prereport[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('focus', async () => {

      setIsLoading(true)
      setPreReports([])

      const { data } = await qcareApi.get<PrereportsResponse>(`/prereport?page=${page}`)

      setPreReports(data.prereports)
      setTotalPages(data.totalPages)
      setIsLoading(false)
    })

    return () => {
      setPreReports([])
      setIsLoading(false)
    }

  }, [])

  if (isLoading) return <LoadingScreen />

  return (

    <View
      style={globalStyles.container}
    >
      {
        preReports.length > 0
          ? <FlatList
            contentInset={{ bottom: 50 }}
            style={{ width: '100%', height: '100%', padding: 10 }}
            nestedScrollEnabled={true}
            data={preReports}
            keyExtractor={(prereport) => prereport._id}
            renderItem={({ item }) => <CardPrereport
              refresh={refresh}
              setRefresh={setRefresh}
              prereport={item} />}

            showsVerticalScrollIndicator={false}
          />
          :
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <TextTitle style={{ textAlign: "center" }}>No Intakes</TextTitle>
          </View>
      }
    </View>


  )
}