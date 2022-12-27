import { Alert } from 'react-native'


export const alertMsg = (title:string, msg:string, action?:()=> void) => {
  return Alert.alert(
        title,
        msg,
        [
          { 
            text: "OK",
            onPress: action && action,
           }
        ]
    )
}
