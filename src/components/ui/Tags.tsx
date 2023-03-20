import React from 'react'
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../theme/globalStyles'
import { darkGrey } from '../../theme/variables'
import { TextApp } from './TextApp'

interface Props{
    tags: string[]
    setTags: (val:string[]) => void
    style?: StyleProp<ViewStyle>
    nowrap?: boolean
}

export const Tags = ({tags, setTags, style, nowrap=false}:Props) => {
    return (
        <>
            {
                tags.length > 0 &&
                <View style={{ ...globalStyles.flexRow, flexWrap: "wrap", ...style as any }}>
                    {
                        tags.map(cond => (
                            <View key={cond}
                                style={{ ...globalStyles.flexRow, flexWrap: "wrap", marginVertical: 3, marginRight: 5, backgroundColor: darkGrey, borderRadius: 50, paddingVertical: 3, paddingHorizontal: 10 }}
                            >
                                <TextApp nowrap={nowrap} size='s' color='white' style={{ flex: nowrap ? 1 : 0, overflow: "hidden"}}>{cond}</TextApp>

                                <TouchableOpacity
                                    style={{ marginLeft: 5, width: 20, backgroundColor: darkGrey }}
                                    onPress={() => setTags(tags.filter(item => item !== cond))}
                                >
                                    <Icon name='close' size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            }
        </>
    )
}
