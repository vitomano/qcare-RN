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
import { useLifeTest, useDeleteLastDay } from '../api/useLifeTest';
import { ScoreColor } from '../components/ui/ScoreColor'
import { CentredContent } from '../components/CenterContent'
import { DayCard } from '../components/ui/DayCard'
import { AddDay } from '../components/AddDay';
import { ModalBlock } from '../components/modals/ModalBlock';

import { CustomStatus } from '../components/ui/CustomStatus';
import { ModalConfirmation } from '../components/modals/ModalConfirmation';


interface Props extends StackScreenProps<LifeTestStackParams, "LifeTestScreen"> { };


export const LifeTestScreen = ({ route, navigation }: Props) => {

  const { data: lifeTest, isLoading, isError, refetch } = useLifeTest(route.params.id)
  const { mutateAsync, isLoading:isDeleting } = useDeleteLastDay()

  const [modalAddDay, setModalAddDay] = useState(false)
  const [modalDeleteDay, setModalDeleteDay] = useState(false)

  //-----------------------------------------------------------------------

  const deleteLastDay = async () => {
    await mutateAsync(route.params.id)
    setModalDeleteDay(false)
  };

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
                <CustomStatus lifetest={lifeTest!} id={route.params.id} />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.mainInfo}>

            <View style={{ ...globalStyles.flexBetween, marginBottom: 10 }}>
              <TextApp size='m' bold>{lifeTest?.reportId?.mainData?.pallet_ref || "--"}</TextApp>
              <ScoreColor short score={lifeTest?.score || "0"} style={{ borderRadius: 50, paddingHorizontal: 10 }} />
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: 100 }}>Grower</TextApp>
              <TextApp style={{ flex: 1 }}>{lifeTest?.grower || lifeTest?.reportId?.mainData?.grower || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: 100 }}>GGN</TextApp>
              <TextApp style={{ flex: 1 }}>{lifeTest?.reportId?.mainData?.gln_ggn || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: 100 }}>Product</TextApp>
              <TextApp style={{ flex: 1 }}>{lifeTest?.reportId?.mainData?.product || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: 100 }}>Date</TextApp>
              <TextApp style={{ flex: 1 }}>{dateFormat(lifeTest?.date) || '--'}</TextApp>
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 3 }}>
              <TextApp bold style={{ width: 100 }}>Variety</TextApp>
              <TextApp style={{ flex: 1 }}>{lifeTest?.reportId?.mainData?.variety || '--'}</TextApp>
            </View>

          </View>

          <View>
            {
              lifeTest?.test.map((day, index) => (
                <DayCard key={day._id} index={index} day={day} lifeId={route.params.id} />

              ))
            }
          </View>

          <CentredContent style={{ marginTop: 25, flexDirection: "row", justifyContent: "center" }}>
            {
              lifeTest?.test.length! > 0 &&
              <ButtonStyled
                onPress={() => setModalDeleteDay(true)}
                text={`Day ${lifeTest?.test.length}`}
                danger
                width={40} icon="trash" iconSize={22}
                styleText={{ fontWeight: "bold" }} />
            }
            {
              lifeTest?.test.length! > 0 && lifeTest?.test.length! < 7 &&
              <View style={{ width: 10 }} />
            }

            {
              lifeTest?.test.length! < 7 &&
              <ButtonStyled
                onPress={() => setModalAddDay(true)}
                text={`Day ${lifeTest?.test.length! + 1}`}
                blue
                width={40} icon="add-circle"
                styleText={{ fontWeight: "bold" }} />
            }
          </CentredContent>

          <ModalConfirmation
            message={`Do you want to delete Day ${lifeTest?.test.length}?`}
            action={deleteLastDay}
            modal={modalDeleteDay}
            openModal={setModalDeleteDay}
            loading={isDeleting}
          />

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