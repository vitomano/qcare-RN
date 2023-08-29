import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { View, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native'
import { CardReport } from '../components/cards/CardReport';
import { CentredContent } from '../components/CenterContent';
import ButtonStyled from '../components/ui/ButtonStyled';
import { TextApp } from '../components/ui/TextApp';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';
import { filterRed, inputColor } from '../theme/variables';
import { LifeTestStackParams } from '../navigation/LifeTestStack';
import { useFilterLife } from '../api/useFilterLifeTest';
import { CardLifeTest } from '../components/cards/CardLifeTest';
import { FilterLifeContext } from '../context/FilterLifeContext';

interface Props extends StackScreenProps<LifeTestStackParams, "FilterLifeScreen"> { };

export const FilterLifeScreen = ({ route, navigation }: Props) => {

  const { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, lifeTests } = useFilterLife(route.params.query)
  const { cleanAll } = useContext(FilterLifeContext)

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
        lifeTests.length > 0
          ?
          <View style={{ marginBottom: 60 }}>

            <View style={{ marginBottom: 5, marginRight: 10, alignSelf: "flex-end" }}>
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  cleanAll()
                  navigation.navigate('LifeTestsScreen' as never)

                }}
              >
                <View style={ styles.closeBtn }>
                  <TextApp size='s' color='white'>Clean filter</TextApp>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ ...globalStyles.flexRow, backgroundColor: inputColor, marginTop: 5, paddingVertical: 4, borderRadius: 50, marginBottom: 10 }}>
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

const styles = StyleSheet.create({
    closeBtn:{
      backgroundColor: filterRed,
      flexDirection: "row",
      alignItems: "center",
      padding: 3,
      paddingHorizontal: 6,
      borderRadius: 50
    }
});