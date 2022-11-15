import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FRUITS } from '../../data/selects';
import { Fruit } from '../../interfaces/interfaces';
import { capitalize } from '../../helpers/eliminarEs';
import { globalStyles } from '../../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { bgColor, greenMain, inputColor, silver, darkGrey, green, grey } from '../../theme/variables';

interface Props {
    activeModal: (b: boolean) => void
    setFruit: (fruit: Fruit) => void
    fruit: Fruit
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const ModalFruitSelect = ({ activeModal, setFruit, fruit }: Props) => {

    const onPressItem = (fruit: Fruit) => {
        activeModal(false)
        setFruit(fruit)
    };



    return (
        <TouchableOpacity
            onPress={() => activeModal(false)}
            style={styles.container}
        >
            <View
                style={{ ...styles.modal, width: WIDTH - 20, height: "auto", maxHeight: HEIGHT - 80 }}
            >
                <ScrollView>
                    {
                        FRUITS.map((option, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.option}
                                onPress={() => onPressItem(option)}
                            >
                                <View style={ [globalStyles.flexRow, option === fruit && styles.selected] }>
                                    <View style={{width: 30}}>
                                        {
                                            option === fruit &&
                                            <Icon name="checkmark" size={20} style={{ color: darkGrey, alignSelf: 'center' }} />
                                        }
                                    </View>
                                    <Text
                                        style={styles.text}
                                    >{capitalize(option)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    modal: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    option: {
        alignItems: 'flex-start',
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
        // fontWeight: 'bold'
    },
    selected:{
        flex: 1,
        width: '100%',
        backgroundColor: grey,
        borderRadius: 10,
        // paddingLeft: 5,
        // borderColor: greenMain,
        // borderWidth: .5
    }
});