import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ReportsStackParams } from '../navigation/ReportsStack';
import { ReportMain } from '../components/ReportMain';
import { blue, greenMain, pdf } from '../theme/variables';
import { PalletReport } from '../components/PalletReport';
import { globalStyles } from '../theme/globalStyles';
import { LoadingScreen } from './LoadingScreen';
import { TextApp } from '../components/ui/TextApp';
import { useReport } from '../api/useReport';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalBlock } from '../components/modals/ModalBlock';
import { Share } from '../components/Share';


interface Props extends StackScreenProps<ReportsStackParams, "ReportScreen"> { };

export const ReportScreen = ({ route }: Props) => {

  const { isLoading, data, refetch } = useReport(route.params.id)

  const [modalShare, setModalShare] = useState(false)

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
            style={{ backgroundColor: greenMain }}
          />
        }
        style={{ ...globalStyles.containerFlex }}>

        <View style={{ backgroundColor: greenMain, paddingHorizontal: 20, alignItems: 'center' }}>
          <TextApp color='white' bold size='l' style={{ marginTop: 10 }}>{data?.mainData.pallet_ref || "--"}</TextApp>

          <View style={{ backgroundColor: '#fff', borderRadius: 120, marginBottom: 20, marginTop: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
            <TextApp bold size='s' style={{ marginVertical: 4 }}>{new Date(data?.date as any).toLocaleDateString() || "--"}</TextApp>
          </View>

        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 50 }}>
          {
            data?.mainData &&
            <ReportMain mainData={data.mainData} />
          }

          {
            data?.pallets && data.pallets.length > 0

              ? data?.pallets.map((pallet, i) => (
                <PalletReport key={pallet.pid} pallet={pallet} repId={route.params.id} i={i} format={Number(data?.mainData?.format_gr) || Number(data?.formatGr) || 0} />
              ))
              : <TextApp bold style={{ textAlign: "center", marginBottom: 10, marginTop: 20, fontSize: 18 }}>No Pallets</TextApp>
          }

          <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginTop: 10, marginBottom: 20 }}>
            <TextApp bold style={{ marginBottom: 10 }}>Comments</TextApp>
            <TextApp size='s'>{data?.comments || "no comments"}</TextApp>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`https://q-care.info/view-pdf/${route.params.id}`)}

              activeOpacity={.8}
              style={{ ...styles.mainIcon, backgroundColor: pdf }}>
              <Image source={require("../assets/pdf-icon.png")} style={{ width: 25, height: 25 }} resizeMode="contain" />
            </TouchableOpacity>

            <View style={{ width: 10 }} />
            <TouchableOpacity
              onPress={() => setModalShare(true)}
              activeOpacity={.9} style={{ ...styles.mainIcon, backgroundColor: blue }}>
              <Icon name="link" size={25} color="#fff" />
            </TouchableOpacity>
          </View>

          <ModalBlock
            modal={modalShare}
            openModal={setModalShare}
          >
              <Share
                closeModal={setModalShare}
                data={data!}
              />
          </ModalBlock>

        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  mainIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});
