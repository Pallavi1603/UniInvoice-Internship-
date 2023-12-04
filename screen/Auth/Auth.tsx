import { StyleSheet, View, Dimensions, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { MCColor } from '../../typography/MCColor';
import Signin from '../../components/auth/Signin';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen')

const Auth = () => {

    const navigation = useNavigation()

    const [singIn, setSingIn] = useState(true);
    const handleSignUpNavigation = () => {
        navigation.navigate("Signup")
    }


    return (
        <View style={styles.container} >

            <StatusBar
                translucent
                backgroundColor="#00000030"
            // barStyle="dark-content"
            />

            <Image
                source={{ uri: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                style={styles.banner}
            />

            <Signin navigation={navigation} />


            <View style={styles.signupContainer}>
                <PrimaryBtn
                    onPress={handleSignUpNavigation}
                    text="SIGN UP"
                    color={MCColor.lightBlue}
                    textColor={MCColor.primary}
                />
            </View>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MCColor.gray,
    },
    btnContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -26
    },
    btn: {
        backgroundColor: MCColor.blue,
        borderRadius: 16,
        paddingVertical: 10,
        alignItems: 'center',
        width: '45%',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: MCColor.primary,
        elevation: 50,
        shadowColor: MCColor.red,

    },
    text: {
        color: "#fff",
        fontWeight: '700',
        fontFamily: 'Nunito'
    },
    banner: {
        height: height * 0.26,
        width: '100%'
    },
    signupContainer: {
        marginTop: 30,
        width: '96%',
        alignSelf: 'center',
    }
})