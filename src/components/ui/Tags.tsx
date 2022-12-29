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
}

export const Tags = ({tags, setTags, style}:Props) => {
    return (
        <>
            {
                tags.length > 0 &&
                <View style={{ ...globalStyles.flexRow, flexWrap: "wrap", ...style as any }}>
                    {
                        tags.map(cond => (
                            <View key={cond}
                                style={{ ...globalStyles.flexRow, marginVertical: 3, marginRight: 5, backgroundColor: darkGrey, borderRadius: 50, paddingVertical: 3, paddingHorizontal: 10 }}
                            >
                                <TextApp size='s' color='white'>{cond}</TextApp>

                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
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
