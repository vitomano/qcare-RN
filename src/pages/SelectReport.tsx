import React from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native';
import { TitleApp } from '../components/TitleApp'
import { newReport } from '../data/new'
import { globalStyles } from '../theme/globalStyles'
import { capitalize } from '../helpers/eliminarEs';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any> { }

export const SelectReport = ({ navigation }: Props) => {

  const screenWidth = Dimensions.get('window').width

  return (
    <View style={{ ...globalStyles.containerFlex, }}>

      <TitleApp title='Select Product' />

      <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {
          newReport.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.95}
              onPress={() => navigation.navigate('NewReportScreen', { fruit: item.product })}
            >
              <View style={{ ...styles.newCard, width: screenWidth / 2 - 25, ...globalStyles.shadow }}>
                <Image
                  style={styles.cardImage}
                  source={item.url}
                />
                <Text style={{ fontWeight: 'bold' }}>{capitalize(item.product)}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newCard: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  }
});