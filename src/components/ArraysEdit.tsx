import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'
import { text } from '../theme/variables'

interface Props {
    arrayItem: string[]
    setVal: React.Dispatch<React.SetStateAction<string | number | boolean | string[]>>
}

export const ArraysEdit = ({ arrayItem, setVal }: Props) => {

    const handleChange = (e: string, index: number) => {
        const newItems = arrayItem.slice(0)
        newItems[index] = e
        setVal(newItems)
    };


    return (

        <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent:"space-between"}}>
            {
                arrayItem.map((item, i) => (

                    <View key={i} style={{...globalStyles.flexRow, marginBottom: 10, width: "48%"}}>
                        <View style={{ backgroundColor: text, marginRight:5, borderRadius: 50, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: "center", color: "#fff" }}>{i+1}</Text>
                        </View>
                        <TextInput
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            value={item as string}
                            autoCorrect={false}
                            style={{ ...inputStyles.inputOutline, flex: 1 }}
                            onChangeText={(e) => handleChange(e, i)}
                        />
                    </View>
                ))
            }
        </View>

    )
}

//     <TextInput
//     keyboardType='number-pad'
//     autoCapitalize="none"
//     value={val as string}
//     autoCorrect={false}
//     style={{ ...inputStyles.inputOutline }}
//     onChangeText={(e) => setVal(e)}
// />