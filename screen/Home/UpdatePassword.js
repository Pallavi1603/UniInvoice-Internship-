import React from 'react';
import {View,Text,StyleSheet,Image, ScrollView} from "react-native";
import ScreenHeader from '../../../components/ScreenHeader';
import PrimaryBtn from '../../../components/buttons/PrimaryBtn';
import { MCColor } from '../../../typography/MCColor';
import InputBox from '../../../components/InputBox';


  

const UpdatePassword = () => {
// const [New,setNew]=useState("");

//     const handleNew = (text:string) => {
//         setNew(text);
//     };

  return (
   <ScrollView style={styles.main}>
    <ScreenHeader Icon/>
    <View style={styles.View}>
        <Text style={styles.text}>New Password</Text>
         <View style={styles.Input}> 
        <InputBox
            placehoder='New Password'
            secureTextEntry={true}
        />
        </View>
        <View style={styles.Input1}> 
        <InputBox
            placehoder='Confirm Password'
            secureTextEntry={true}
          />
        </View>

        </View>
        <View style={styles.btn}>
        <PrimaryBtn text="Submit" color={MCColor.primary} textColor={MCColor.gray}  />
        </View>

   </ScrollView>
  )
}

const styles=StyleSheet.create({
    main: { backgroundColor: "#fff" },
    center: { alignSelf: "center" },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
  
    View:{
        marginTop:40
    },
    text:{
        fontFamily: "Nunito",
        color: MCColor.black,
        fontWeight: "700",
        fontSize: 20,
        marginLeft:20
  },
  
    Input:{
        marginLeft:20,
        marginRight:20,
        marginTop:40,
    },
    Input1:{
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },
    btn:{
        marginTop:30,
    }
})

export default UpdatePassword
