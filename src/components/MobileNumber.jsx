import React, {useState } from "react";

import{View ,Text,TextInput,StyleSheet} from "react-native";

export default function MobileNumberInput({
    value,
    onChangeText,
    label="Mobile Number",
    required= true
}){
    const [error,setError] = useState('');
    const handleChange = (text) =>{
    if (text.length >0 && text.length <8){
        setError("Mobile number must be 8 digits ");
    }
    else{
        setError('');
    }
   
  };



return (
    <View style={styles.Wrapper}>
        <Text style={styles.label}>
            {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TextInput 
        style={[styles.input, error ? styles.inputError:null]}
        value={value}
        placeholder="Enter MobileNumber"
        keyboardType="number-pad"
        maxLength={8}
        onChangeText={handleChange}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
)
}

const styles=StyleSheet.create({
    Wrapper:{
        marginVertical:10,
        paddingHorizontal:15,
    },
    label:{
        marginBottom:4,
        fontSize:15,
        fontWeight:"bold",
        color:"black"
        ,
    },
    required:{
        color:"red"
    },
    input:{
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        padding:15,
        fontSize:16,backgroundColor:"white"
    },
    inputError:{
        borderColor:"red"
    },
    error:{
        color:"red",
        marginTop:4,
        fontSize:12
    }
});