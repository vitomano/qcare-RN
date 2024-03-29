import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { CardPrereport } from '../components/cards/CardPrereport'
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen'
import { usePrereports } from '../api/usePrereports';
import ButtonStyled from '../components/ui/ButtonStyled';
import { CentredContent } from '../components/CenterContent'
import { TextApp } from '../components/ui/TextApp'
import { TeamSelector } from '../components/TeamSelector'

export const PreReportsScreen = () => {

  const [page, setPage] = useState(1)
  const [team, setTeam] = useState<string | undefined>(undefined)

  const { prereports, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = usePrereports(page, team)

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

      <TeamSelector
        style={{ marginHorizontal: 5, marginBottom: 15, marginTop: 15, width: "60%" }}
        allTitle='All Pre Reports'
        team={team}
        setPage={setPage}
        setTeam={setTeam}
      />

      {
        prereports.length > 0
          ?
          <View style={{ marginBottom: 50 }}>
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
          <View style={{ marginTop: 30 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Pre Reports</TextApp>
          </View>
      }

    </ScrollView>


  )
}


