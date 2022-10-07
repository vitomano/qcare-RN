import { Platform, StyleSheet } from "react-native";
import { bgColor, inputColor, text } from "./variables";


export const globalStyles = StyleSheet.create({
    globalMargin: {
        padding: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: bgColor,
        paddingHorizontal: 10,
    },
    containerFlex: {
        flex: 1,
        backgroundColor: bgColor,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    
        elevation: 5,
    },

    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 10,
    },
    inputText:{
        color: text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input:{
        backgroundColor: inputColor,
        borderRadius: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 10,
        paddingHorizontal: 10,
    },
});