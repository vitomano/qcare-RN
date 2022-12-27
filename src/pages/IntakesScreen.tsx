import React from 'react'
import { View, FlatList, Text, RefreshControl, Linking, ScrollView } from 'react-native'
import { CardIntake } from '../components/cards/CardIntake';
import { globalStyles } from '../theme/globalStyles'
import { TextTitle } from '../components/ui/TextTitle';
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
      style={{...globalStyles.container, paddingTop: 10, paddingHorizontal: 10}}
    >
      {
        allIntakes &&
          allIntakes.length > 0
          ?
          <View style={{marginBottom: 50}}>
            {
                        allIntakes.map(intake => (
                          <CardIntake
                            key={intake._id}
                            intake={intake} />
                        ))
                        // <>
                        //   <FlatList
                        //     contentInset={{ bottom: 50 }}
                        //     style={{ width: '100%', height: '100%', flex: 1, padding: 10 }}
                        //     nestedScrollEnabled={true}
                        //     data={allIntakes}
                        //     keyExtractor={(report) => report._id}
                        //     renderItem={({ item }) => <CardIntake
                        //       intake={item} />}
              
                        //     showsVerticalScrollIndicator={false}
              
                        //     refreshControl={
                        //       <RefreshControl
                        //         refreshing={isLoading}
                        //         onRefresh={refetch}
                        //       />
                        //     }
                        //   />
                        // </>
            }
          </View>

          :
          <View style={{ paddingTop: 10, marginVertical: 50 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center", marginBottom: 20 }}>No Intakes</TextApp>
            <CentredContent>
              <ButtonStyled
                text='Upload in web version'
                width={60}
                blue
                outline
                onPress={() => Linking.openURL("https://q-care.info/newintake")}
              />
            </CentredContent>
          </View>
      }
    </ScrollView>


  )
}