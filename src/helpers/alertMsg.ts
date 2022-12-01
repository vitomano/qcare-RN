import { Alert } from 'react-native'

export const alertMsg = (title:string, msg:string) => {
  return Alert.alert(
        title,
        msg,
        [{ text: "OK" }]
    )
}
