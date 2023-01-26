import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useLifeTests } from '../api/useLifeTests'
import { CardLifeTest } from '../components/cards/CardLifeTest'
import { CentredContent } from '../components/CenterContent'
import ButtonStyled from '../components/ui/ButtonStyled'
import { FilterCollapse } from '../components/ui/FilterCollapse'
import { TextApp } from '../components/ui/TextApp'
import { globalStyles } from '../theme/globalStyles'
import { inputColor } from '../theme/variables'
import { LoadingScreen } from './LoadingScreen'


export const LifeTestsScreen = () => {

  const { lifeTests, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useLifeTests()

  if (isLoading) return <LoadingScreen />  

  return (

    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }
      style={{ ...globalStyles.container, paddingHorizontal: 10 }}>
      {
        lifeTests.length > 0
          ?
          <View style={{ marginBottom: 50, marginTop: 10 }}>

            <FilterCollapse lifeTestFilter/>

            <View style={{ ...globalStyles.flexRow, backgroundColor: inputColor, marginTop: 5, paddingVertical: 4, borderRadius: 50, marginBottom: 5 }}>
              <View style={{ width: 80 }}>
                <TextApp size='xs' bold style={{ paddingLeft: 8 }}>Status</TextApp>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <TextApp size='xs' bold>Report Info</TextApp>
              </View>

              <View style={{ width: 84 }}>
                <TextApp size='xs' bold>Days</TextApp>
              </View>
            </View>

            {
              lifeTests.map(lifeTest => (
                <CardLifeTest
                  key={lifeTest._id}
                  lifeTest={lifeTest}
                  id={lifeTest._id}
                />
              ))
            }
            {
              hasNextPage &&
              <CentredContent style={{ marginTop: 30 }}>
                <ButtonStyled
                  text={isFetchingNextPage ? "Loading..." : 'Load more'}
                  blue
                  width={50}
                  onPress={fetchNextPage}
                  style={{ marginBottom: 50 }}
                  loading={isFetchingNextPage}
                />
              </CentredContent>
            }
          </View>

          :
          <View style={{ marginVertical: 50 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Shelf life test</TextApp>
          </View>
      }

    </ScrollView>


  )
}