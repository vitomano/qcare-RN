import React, { useContext } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import { darkGrey } from '../../theme/variables'
import { TextApp } from './TextApp'
import { QueryType } from '../../interfaces/interfaces';
import { FilterContext } from '../../context/FilterContext'
import { FilterLifeContext } from '../../context/FilterLifeContext';

interface Props {
    label: string,
    value: string,
    query: QueryType,
    lifetest?: boolean
}

export const FilterInput = ({ label, value, query, lifetest=false }: Props) => {

    const { handleString } = useContext( FilterContext )
    const { handleString:handleLifeString } = useContext( FilterLifeContext )

    return (
        <View style={[globalStyles.flexRow, styles.container]}>
            <TextApp size='s' bold>{label}</TextApp>
            <TextInput
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                value={ value as string}
                onChangeText={(e) => {
                    lifetest
                    ? handleLifeString(query, e)
                    : handleString(query, e)
                }}
                style={styles.textInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === "android" ? 2 : 6,
        marginBottom: 15,
        borderBottomColor: darkGrey,
        borderBottomWidth: .5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        padding: 0
    }
});