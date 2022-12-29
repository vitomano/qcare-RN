import React from 'react'
import { View, RefreshControl, Linking, ScrollView } from 'react-native'
import { CardIntake } from '../components/cards/CardIntake';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';

import { useIntakes } from '../api/useIntakes';
import { TextApp } from '../components/ui/TextApp';
import ButtonStyled from '../components/ui/ButtonStyled';
import { CentredContent } from '../components/CenterContent';


export const IntakesScreen = () => {

  const { data: allIntakes, isLoading, refetch } = useIntakes()

  if (isLoading) return <LoadingScreen />

  return (

    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }
      style={{ ...globalStyles.container, paddingTop: 10, paddingHorizontal: 10 }}
    >
      <View style={{ marginBottom: 70 }}>
        {
          allIntakes &&
            allIntakes.length > 0
            ?
            <View>
              {
                allIntakes.map(intake => (
                  <CardIntake
                    key={intake._id}
                    intake={intake} />
                ))
              }
            </View>

            :
            <View style={{ paddingTop: 10, marginTop: 50 }}>
              <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center", marginBottom: 20 }}>No Intakes</TextApp>
            </View>
        }

        <CentredContent style={{marginTop:20}}>
          <ButtonStyled
            text='Upload in web version'
            width={60}
            blue
            outline
            onPress={() => Linking.openURL("https://q-care.info/newintake")}
          />
        </CentredContent>
      </View>
    </ScrollView>


  )
}