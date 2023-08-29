import React, { useState } from 'react'
import { View, RefreshControl, ScrollView } from 'react-native'
import { CardIntake } from '../components/cards/CardIntake';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';

import { useIntakes } from '../api/useIntakes';
import { TextApp } from '../components/ui/TextApp';
import ButtonStyled from '../components/ui/ButtonStyled';
import { CentredContent } from '../components/CenterContent';
import { IntakesStackParams } from '../navigation/IntakesStack';
import { StackScreenProps } from '@react-navigation/stack';
import { TeamSelector } from '../components/TeamSelector';

interface Props extends StackScreenProps<IntakesStackParams, "IntakesScreen"> { };

export const IntakesScreen = ({ navigation }: Props) => {

  const [page, setPage] = useState(1)
  const [team, setTeam] = useState<string | undefined>(undefined)

  const { intakes, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useIntakes(page, team)

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
      <CentredContent style={{ marginVertical: 20 }}>
        <ButtonStyled
          text='Upload from CSV file'
          width={70}
          blue
          icon='cloud-upload-outline'
          onPress={() => navigation.navigate("IntakeUploadScreen" as never)}
        />
      </CentredContent>

      <TeamSelector
        style={{ marginHorizontal: 5, marginBottom: 15, marginTop: 5, width: "60%" }}
        allTitle='All Intakes'
        team={team}
        setPage={setPage}
        setTeam={setTeam}
      />

      <View style={{ marginBottom: 70 }}>

        {
          intakes &&
            intakes.length > 0
            ?
            <View>
              {
                intakes.map(intake => (
                  <CardIntake
                    key={intake._id}
                    intake={intake} />
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
                    loading={isFetchingNextPage}
                  />
                </CentredContent>
              }

            </View>

            :
            <View style={{ paddingTop: 10, marginTop: 10 }}>
              <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center", marginBottom: 20 }}>No Intakes</TextApp>
            </View>
        }

      </View>
    </ScrollView>


  )
}