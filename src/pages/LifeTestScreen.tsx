import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import ButtonStyled from '../components/ui/ButtonStyled';
import { TextApp } from '../components/ui/TextApp'
import { dateFormat } from '../helpers/dateFormat'

import { LifeTestStackParams } from '../navigation/LifeTestStack'
import { globalStyles } from '../theme/globalStyles';
import { mediumGrey } from '../theme/variables';
import { LoadingScreen } from './LoadingScreen'
import { useLifeTest } from '../api/useLifeTest';
import { ScoreColor } from '../components/ui/ScoreColor'
import { CentredContent } from '../components/CenterContent'
import { DayCard } from '../components/ui/DayCard'
import { AddDay } from '../components/AddDay';
import { ModalBlock } from '../components/modals/ModalBlock';

import { CustomStatus } from '../components/ui/CustomStatus';


interface Props extends StackScreenProps<LifeTestStackParams, "LifeTestScreen"> { };


export const LifeTestScreen = ({ route, navigation }: Props) => {

  const { data: lifeTest, isLoading, isError, refetch } = useLifeTest(route.params.id)

  const [modalAddDay, setModalAddDay] = useState(false)
  // const queryClient = useQueryClient()

  //-----------------------------------------------------------------------


  if (isError) { navigation.navigate('LifeTestsScreen') }
  if (isLoading) return <LoadingScreen />

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        style={{ ...globalStyles.containerFlex }}>

        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60 }}>

          <View style={{ ...globalStyles.flexBetween }}>
            <TextApp bold size='m'>Shelf Life Test</TextApp>
            <View style={{ width: 80 }}>
              <TouchableWithoutFeedback>
                <CustomStatus lifetest={lifeTest!} id={route.params.id}/>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.mainInfo}>

            <View style={{ ...globalStyles.flexBetween, marginBottom: 10 }}>
              <TextApp size='m' bold>{lifeTest?.reportId?.mainData?.pallet_ref || "--"}</TextApp>
              <ScoreColor short score={lifeTest?.score || "0"} style={{ borderRadius: 50, paddingHorizontal: 10 }} />
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: "50%" }}>Grower</TextApp>
              <TextApp>{lifeTest?.grower || lifeTest?.reportId?.mainData?.grower || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: "50%" }}>GGN</TextApp>
              <TextApp>{lifeTest?.reportId?.mainData?.gln_ggn || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: "50%" }}>Product</TextApp>
              <TextApp>{lifeTest?.reportId?.mainData?.product || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: "50%" }}>Date</TextApp>
              <TextApp>{dateFormat(lifeTest?.date) || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: "50%" }}>Variety</TextApp>
              <TextApp>{lifeTest?.reportId?.mainData?.variety || '--'}</TextApp>
            </View>

          </View>

          <View>
            {
              lifeTest?.test.map((day, index) => (
                <DayCard key={day._id} index={index} day={day} lifeId={route.params.id}/>

              ))
            }
          </View>

          {
            lifeTest?.test.length! < 7 &&
            <CentredContent style={{ marginTop: 25 }}>
              <ButtonStyled
                onPress={() => setModalAddDay(true)}
                text={`Day ${lifeTest?.test.length! + 1}`}
                blue
                width={40} icon="add-circle"
                styleText={{ fontWeight: "bold" }} />
            </CentredContent>
          }

          <ModalBlock
            modal={modalAddDay}
            openModal={setModalAddDay}
            style={{ padding: 20 }}
          >
            <AddDay
              lifeTestId={route.params.id}
              days={lifeTest?.test!}
              setModalAddDay={setModalAddDay}
            />
          </ModalBlock>


          {/* <Button title='toast' onPress={() => Toast.show({
            type: 'success',
            text1: 'Done!',
            text2: 'Day has been added'
          })} />

          <Button title='toast error' onPress={() => Toast.show({
            type: 'error',
            text1: 'Done!',
            text2: 'Day has been added'
          })} /> */}

        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  mainInfo: {
    marginTop: 20,
    borderColor: mediumGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  }
});