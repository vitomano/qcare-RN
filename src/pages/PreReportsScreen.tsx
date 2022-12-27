import React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { CardPrereport } from '../components/cards/CardPrereport'
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen'
import { usePrereports } from '../api/usePrereports';
import ButtonStyled from '../components/ui/ButtonStyled';
import { CentredContent } from '../components/CenterContent'
import { TextApp } from '../components/ui/TextApp'

export const PreReportsScreen = () => {

  // const navigation = useNavigation()

  const { prereports, isLoading, hasNextPage, fetchNextPage, refetch } = usePrereports()

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
        prereports.length > 0
          ?
          <View style={{marginBottom: 50}}>
            {

              prereports.map(prereport => (
                <CardPrereport
                  key={prereport._id}
                  prereport={prereport} />
              ))
            }
            {
              hasNextPage &&
              <CentredContent style={{ marginTop: 30 }}>
                <ButtonStyled
                  text='Load more'
                  blue
                  width={50}
                  onPress={fetchNextPage}
                  style={{ marginBottom: 50 }}
                />
              </CentredContent>
            }
          </View>

          :
          <View style={{ marginVertical: 50 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Pre Reports</TextApp>
          </View>
      }
      {/* {
        data?.pages &&
        <>
          {
            data?.pages.map((page, index) =>

              <View key={index}>
                {
                  page.prereports.length > 0
                    ?
                    <>
                      {page.prereports.map(prereport => (
                        <CardPrereport
                          key={prereport._id}
                          prereport={prereport} />
                      ))}

                    </>
                    :
                    <View style={{ marginVertical: 50 }}>
                      <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Pre Reports</TextApp>
                    </View>
                }
              </View>
            )
          }
        </>

      } */}

    </ScrollView>


  )
}


