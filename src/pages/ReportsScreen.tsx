import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useReports } from '../api/useReports';
import { CardReport } from '../components/cards/CardReport';
import { CentredContent } from '../components/CenterContent';
import ButtonStyled from '../components/ui/ButtonStyled';
import { TextApp } from '../components/ui/TextApp';
import { globalStyles } from '../theme/globalStyles'
import { LoadingScreen } from './LoadingScreen';

import { FilterCollapse } from '../components/ui/FilterCollapse';
import { TeamSelector } from '../components/TeamSelector';

export const ReportsScreen = () => {

  const [page, setPage] = useState(1)
  const [team, setTeam] = useState<string | undefined>(undefined)

  const { isLoading, hasNextPage, fetchNextPage, refetch, reports, isFetchingNextPage } = useReports(page, team)

  if (isLoading) return <LoadingScreen />

  return (

    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }
      style={{ ...globalStyles.container, marginTop: 10, paddingHorizontal: 10 }}>

      <FilterCollapse />

      <TeamSelector
        style={{ marginHorizontal: 5, marginBottom: 15, marginTop: 5, width: "60%" }}
        allTitle='All Reports'
        team={team}
        setPage={setPage}
        setTeam={setTeam}
      />

      {
        reports.length > 0
          ?
          <View style={{ marginBottom: 60 }}>

            {
              reports.map(report => (
                <CardReport
                  key={report._id}
                  report={report} />
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
          <View style={{ marginVertical: 50 }}>
            <TextApp bold style={{ textAlign: "center", alignSelf: "center", justifyContent: "center" }}>No Reports</TextApp>
          </View>
      }

    </ScrollView>

  )
}