import React, { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { CardIntake } from '../components/cards/CardIntake';
import { globalStyles } from '../theme/globalStyles'
import qcareApi from '../api/qcareApi';
import { Intake } from '../interfaces/intakes.reports';
import { TextTitle } from '../components/ui/TextTitle';
import { LoadingScreen } from './LoadingScreen';

import { useNavigation } from "@react-navigation/core";


export const IntakesScreen = () => {

  const [allIntakes, setAllIntakes] = useState<Intake[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('focus', async () => {
      setIsLoading(true)
      try {
        const { data } = await qcareApi.get('/intakes')
        setAllIntakes(data.intakes)
      } catch (error) {
        console.log(error)
      } finally { setIsLoading(false) }
    })

    return () => {
      setAllIntakes([])
      setIsLoading(false)
    }

  }, [])

  if (isLoading) return <LoadingScreen />

  return (

    <View
      style={globalStyles.container}
    >
      {
        allIntakes.length > 0
          ?
          <>
            <FlatList
              contentInset={{ bottom: 50 }}
              style={{ width: '100%', height: '100%', flex: 1, padding: 10 }}
              nestedScrollEnabled={true}
              data={allIntakes}
              keyExtractor={(report) => report._id}
              renderItem={({ item }) => <CardIntake
                refresh={refresh}
                setRefresh={setRefresh}
                intake={item} />}

              showsVerticalScrollIndicator={false}
            />
          </>
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