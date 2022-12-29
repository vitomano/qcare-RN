import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { colorsArray } from '../../helpers/colorsArray'
import { valorPallgrow } from '../../helpers/eliminarEs'
import { DetailObject } from '../../interfaces/intakes.reports'

interface Props {
  pallgrow: DetailObject[]
}

export const ChartPie = ({ pallgrow }: Props) => {

  const screenWidth = Dimensions.get("window").width - 20;

  let dataFinal: object[] = []

  const noWeight = pallgrow.filter(p => p.name !== "weight_10") || []
  const pallgrowArray = noWeight.filter(p => p.valor !== "0" && p.valor !== "" && valorPallgrow(p.valor) > 0) || []


  pallgrowArray.forEach((item, index) => {
    dataFinal.push({
      name: item.label,
      value:
        Array.isArray(item.valor)
          ? valorPallgrow(item.valor) * 100
          : Number(item.valor),
      color: colorsArray[index],
      legendFontColor: "#7F7F7F",
    legendFontSize: 15
    })
  });

  const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style:{
      
    }
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
  };


  return (
    <View style={styles.container}>
      <PieChart
        data={dataFinal}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"value"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        // center={[10, 50]}
        absolute={false}
        center={[0, 0]}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  }
});