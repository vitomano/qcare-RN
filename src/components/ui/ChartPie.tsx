import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PieChart from 'react-native-pie-chart'
import { colorsArray } from '../../helpers/colorsArray'
import { valorPallgrow } from '../../helpers/eliminarEs'
import { DetailObject } from '../../interfaces/intakes.reports'
import { globalStyles } from '../../theme/globalStyles'
import { TextApp } from './TextApp'

interface Props {
  pallgrow: DetailObject[]
}
interface Data {
  label: string
  value: number
  color: string
}

export const ChartPie = ({ pallgrow }: Props) => {

  const [data, setData] = useState<Data[]>([])  

  useEffect(() => {
    const noWeight = pallgrow.filter(p => p.name !== "weight_10") || []
    const pallgrowArray = noWeight.filter(p => p.valor !== "0" && p.valor !== "" && valorPallgrow(p.valor) > 0) || []

    pallgrowArray.forEach((item, index) => {

      setData(d => [...d, {
        label: item.label,
        value:
          Array.isArray(item.valor)
            ? valorPallgrow(item.valor) * 100
            : Number(item.valor),
        color: colorsArray[index],
      }])
    });
  }, [])

  return (
    <View style={styles.container}>
      {
        data.length > 0 &&
        <View style={{marginBottom: 25, justifyContent: "center", alignItems: "center"}}>
          <View style={{marginBottom: 15}}>
            {
              data.map( label => (
                <View key={label.label} style={{...globalStyles.flexRow, marginBottom:5}}>
                  <View style={{ width:15, height: 15, backgroundColor: label.color, borderRadius: 100 }}/>
                  <TextApp size='s' style={{marginLeft: 5}}>{label.label}</TextApp>
                </View>
              ) )
            }
          </View>

          <PieChart
            widthAndHeight={250}
            series={data.map( v => v.value) }
            sliceColor={data.map( c => c.color) }
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#fff'}
          />
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});