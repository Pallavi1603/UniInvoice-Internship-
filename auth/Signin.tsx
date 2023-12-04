import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import PrimaryBtn from '../buttons/PrimaryBtn';
import InputBox from '../InputBox';
import { MCColor } from '../../typography/MCColor';
import { useQuery } from '@apollo/client';
import { loginByCredentials } from '../../graphql/Querys';
import Loader from '../common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = React.memo(({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (text: string) => {
        setEmail(text);
    };

    const handlePassword = (text: string) => {
        setPassword(text);
    };

    const { loading, data, error } = useQuery(loginByCredentials, {
        variables: {
            email: email,
            password: password,
        },
        skip: email === "" || password === ""
    });


    const handleSignIn = () => {
        if (data?.shopByCredentials?.id) {
            AsyncStorage.setItem('shopId', data.shopByCredentials.id)
                .then(() => {
                    navigation.navigate('BottomTabs');
                })
                .catch((error) => {
                    console.error('Error saving shopId to local storage:', error);
                    navigation.navigate('BottomTabs');
                });
        } else {
            !loading && Alert.alert('You may have entered the wrong credentials, please try again.');
        }
    };


    return (
        <View style={styles.main}>
            <Text style={styles.welcome}>Welcome back buddy!</Text>
            <View style={styles.inputsContainer}>
                <View style={styles.mt20}>
                    <InputBox
                        placehoder="Your Email"
                        onChangeText={handleEmail}
                        lable="Email"
                    />
                </View>

                <View style={styles.mt20}>
                    <InputBox
                        placehoder="Your Password"
                        onChangeText={handlePassword}
                        secureTextEntry={true}
                        lable="Password"
                    />
                </View>
            </View>

            <View style={styles.mt30}>
                <PrimaryBtn onPress={handleSignIn}
                    text={!loading ? "SIGN IN" : <Loader size={20} styles={styles.loader} />} />
            </View>

        </View>
    );
});

export default Signin;

const styles = StyleSheet.create({
    main: {
        backgroundColor: MCColor.gray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -10
    },
    mt20: {
        marginTop: 20,
    },
    mt30: {
        marginTop: 30,
    },
    inputsContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    welcome: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Nunito',
        color: MCColor.heading,
        marginLeft: 10,
        marginTop: 30
    },
    loader: {
        backgroundColor: "#00000000"
    }
});
