import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { CardIntake } from '../components/CardIntake';
import { globalStyles } from '../theme/globalStyles'
import qcareApi from '../api/qcareApi';
import { Intake } from '../interfaces/intakes.reports';
import { TextTitle } from '../components/ui/TextTitle';
import { LoadingScreen } from './LoadingScreen';

export const IntakesScreen = () => {

  const [allIntakes, setAllIntakes] = useState<Intake[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getIntakes = async() => {
      try {
        const { data } = await qcareApi.get('/intakes')
        setAllIntakes( data.intakes )
      } catch (error) {
        console.log(error)
      } finally { setIsLoading(false) }
    }

    getIntakes()

  }, [])

  if(isLoading) return <LoadingScreen />


  return (

    <View
      style={ globalStyles.container }
    >
      {
        allIntakes.length > 0
          ? <FlatList
            style={{ width: '100%', height: '100%', padding: 10 }}
            nestedScrollEnabled={true}
            data={allIntakes}
            keyExtractor={(report) => report._id}
            renderItem={({ item }) => <CardIntake intake={item} />}

            showsVerticalScrollIndicator={false}
          />
          :
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <TextTitle style={{ textAlign: "center"}}>No Intakes</TextTitle>
          </View>
      }
    </View>


  )
}