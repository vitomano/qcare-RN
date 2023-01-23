import React, { useContext } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FilterContext } from '../../context/FilterContext'
import { greenMain, inputColor } from '../../theme/variables'
import { TextApp } from './TextApp'

interface ListType {
    label: string
    value: string
}

interface Props {
    label: string,
    value: string[],
    LIST: ListType[]
    query: "fruit" | "score"
}

export const FilterSelect = ({ label, value, LIST, query }: Props) => {

    const { handleArray } = useContext( FilterContext )

    return (
        <View style={styles.container}>
            <TextApp size='s' bold style={{ marginBottom: 5 }}>{label}</TextApp>

            <View style={styles.grid}>
                {
                    LIST.map(item => (
                        query === "fruit"
                            ?
                            item.value !== "other" &&
                            <TouchableOpacity
                                key={item.value}
                                style={{ ...styles.gridItem, width: "32%", backgroundColor: value.includes(item.value) ? greenMain : inputColor }}
                                activeOpacity={.9} onPress={() => handleArray(query, item.value)}>
                                <TextApp
                                    color={value.includes(item.value) ? "white" : "text"}
                                    size='xs' center>{item.value}</TextApp>
                            </TouchableOpacity>
                            :
                            item.value !== "0" &&
                            <TouchableOpacity
                                key={item.value}
                                style={{ ...styles.gridItem, width: "23%", backgroundColor: value.includes(item.value) ? greenMain : inputColor }}
                                activeOpacity={.9} onPress={() => handleArray(query, item.value)}>
                                <TextApp
                                    color={value.includes(item.value) ? "white" : "text"}
                                    size='xs' center>{item.value}</TextApp>
                            </TouchableOpacity>

                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    gridItem: {
        borderRadius: 5,
        paddingVertical: Platform.OS === "android" ? 5 : 8,
        marginBottom: 8
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10
    }
});