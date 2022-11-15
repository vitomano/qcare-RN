import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { StackScreenProps } from '@react-navigation/stack';
import { IntakesStackParams } from '../navigation/IntakesStack';
import { LoadingScreen } from './LoadingScreen';
import { MainInfo, DataPrereport, SingleIntake } from '../interfaces/intakes.reports';
import { palletPrereport } from '../data/prereport';
import { MainForm } from '../components/MainForm';
import StyledButton from '../components/StyledButton';
import { formatSplit, totalKilos, totalSamples } from '../helpers/formatSplit';
import qcareApi from '../api/qcareApi';
import { Fruit } from '../interfaces/interfaces';
import { fruitType } from '../helpers/fruitType';
import { inputStyles } from '../theme/inputStyles';
import { FRUITS, GRADE } from '../data/selects';
import { PickerModal } from '../components/modals/PickerModal';
import { IntakeContext } from '../context/IntakeContext';
import { PalletPrereport } from '../components/PalletPrereport';


interface Props extends StackScreenProps<IntakesStackParams, "IntakeScreen"> { };

export const IntakeScreen = ({ route }: Props) => {


  const { isLoading, mainData, pallets, fruit, totalPallets, setDataPrereport, getMainData, handleFruit } = useContext(IntakeContext)

  // const [pallets, setPallets] = useState<DataPrereport[]>([])
  // const [mainData, setMaindata] = useState<MainInfo | null>(null)
  // const [totalPallets, setTotalPallets] = useState(0)

  // const [fruit, setFruit] = useState<Fruit>("other")
  // const [grade, setGrade] = useState("0")

  const [modalFruit, setModalFruit] = useState(false)
  // const [modalGrade, setModalGrade] = useState(false)


  useEffect(() => {
    getMainData(route.params.id)
    setDataPrereport(totalPallets)
  }, [route.params.id, totalPallets])


  const sendPrereport = () => {
    // console.log(mainData)
    console.log(fruit)
  };



  return (

    <>
      {
        isLoading
          ? (
            <LoadingScreen />
          )
          :
          <ScrollView style={{ ...globalStyles.containerFlex }}>

            <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
              {
                mainData &&
                <>
                  <MainForm
                    mainData={mainData}
                  />

                  {/* ------------------------------------ */}

                  <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <Text style={{ ...inputStyles.inputLabel, width: "50%" }}>Fruit</Text>

                    <PickerModal
                      modal={modalFruit}
                      setModal={setModalFruit}
                      LIST={FRUITS}
                      setState={handleFruit}
                      state={fruit}
                    />
                  </View>

                  {/* ------------------------------------ */}
                </>


              }

              {
                pallets.length > 0
                  ? pallets.map(( pallet, i) => (
                    <PalletPrereport
                      key={pallet.id}
                      pallet={pallet}
                      i={i} />
                  ))
                  : <Text>No Pallets</Text>
              }

              <View style={{ flex: 1, alignItems: "center", marginVertical: 20 }}>

                <StyledButton
                  text='Send'
                  width={50}
                  onPress={sendPrereport}
                />

              </View>

            </View>




          </ScrollView>
      }
    </>
  )
}
