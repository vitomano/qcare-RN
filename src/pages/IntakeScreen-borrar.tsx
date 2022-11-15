import React, { useEffect, useState } from 'react'
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


interface Props extends StackScreenProps<IntakesStackParams, "IntakeScreen"> { };

export const IntakeScreen = ({ route }: Props) => {

  const [pallets, setPallets] = useState<DataPrereport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mainData, setMaindata] = useState<MainInfo | null>(null)
  const [totalPallets, setTotalPallets] = useState(0)

  const [fruit, setFruit] = useState<Fruit>("other")
  const [grade, setGrade] = useState("0")

  const [modalFruit, setModalFruit] = useState(false)
  const [modalGrade, setModalGrade] = useState(false)

  useEffect(() => {
    const loadIntake = async () => {

      try {
        const { data } = await qcareApi.get<SingleIntake>(`/prereport/new-report/${route.params.id}`)

        setFruit(fruitType(data.intakeReport.data?.product) || "other")
        setTotalPallets(parseInt(data.intakeReport.data?.total_pallets) || 0)

        if (data.intakeReport.data !== null) {
          setMaindata({
            ...data.intakeReport.data,
            total_pallets: totalPallets.toString(),
            kilos: totalKilos(data.intakeReport.data.format, data.intakeReport.data.total_boxes).toString() || "0",
            samples: totalSamples(data.intakeReport.data.format).toString() || "1",
            format_gr: formatSplit(data.intakeReport.data.format).toString() || "0",
          })
        } else { setMaindata(null) }


      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    loadIntake()
  }, [route.params.id])


  useEffect(() => {

    setPallets([])
    for (let i = 0; i < (totalPallets || 0); i++) {
      setPallets(c => [...c, palletPrereport()])
    }

  }, [totalPallets])


  const sendPrereport = () => {
    console.log(grade)
    // console.log(pallets)
    // console.log(mainData)
  };


  // const activeFruitModal = (b: boolean) => setIsModalVisible(b)

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
                    setBatchInfo={setMaindata}
                    pallets={pallets}
                  />

                  {/* ------------------------------------ */}


                  <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <Text style={{ ...inputStyles.inputLabel, width: "50%" }}>Fruit</Text>

                    <PickerModal
                      modal={modalFruit}
                      setModal={setModalFruit}
                      LIST={FRUITS}
                      setState={setGrade}
                      state={fruit}
                    />
                  </View>


                  <View style={{ ...globalStyles.flexRow, marginBottom: 20 }}>
                    <Text style={{ ...inputStyles.inputLabel, width: "50%" }}>Grade</Text>

                    <PickerModal
                      modal={modalGrade}
                      setModal={setModalGrade}
                      LIST={GRADE}
                      setState={setGrade}
                      state={grade}
                    />
                  </View>

                  {/* ------------------------------------ */}

                </>


              }

              {/* {
              pallets.length > 0
                ? <ReportPallet pallets={pallets} />
                : <Text>No Pallets</Text>
            } */}

              <View style={{ flex: 1, alignItems: "center" }}>

                <StyledButton
                  text='Send'
                  width={40}
                  onPress={sendPrereport}
                />

              </View>

            </View>




          </ScrollView>
      }
    </>
  )
}
