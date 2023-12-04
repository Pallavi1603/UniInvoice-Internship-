import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/common/Loader';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const loginToken = await AsyncStorage.getItem('shopId');
        navigation.replace(!loginToken ? 'Auth' : 'BottomTabs');
    };

    return (
        <Loader />
    );
};

export default SplashScreen;
