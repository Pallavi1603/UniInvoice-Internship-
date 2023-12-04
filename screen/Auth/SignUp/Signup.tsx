import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useMutation } from '@apollo/client';

import PrimaryBtn from '../../../components/buttons/PrimaryBtn';
import { MCColor } from '../../../typography/MCColor';
import Loader from '../../../components/common/Loader';
import { CREATE_SHOP_MUTATION } from '../../../graphql/Querys';
import { TYPES, UserContext } from '../../../utills/UserContextProvider';
import PersonalInfo from '../../../components/auth/PersonalInfo';
import ShopInfo from '../../../components/auth/ShopInfo';
import TimeImage from '../../../components/auth/TimeImage';
import ServicesLocation from '../../../components/auth/ServicesLocation';
import ScreenHeader from '../../../components/ScreenHeader';

const Signup = () => {

    const { name, shopName, email, password, phone, salonFor, location, imageArray, openTime, closeTime, dispatch, } = useContext(UserContext);

    const [createShopMutation, { loading, error }] = useMutation(CREATE_SHOP_MUTATION);

    const BTNCTA = async () => {
        if (!name || !shopName || !email || !location || !phone || !password || !imageArray || !salonFor || !openTime || !closeTime) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const { data } = await createShopMutation({
                variables: {
                    ownerName: name,
                    shopName: shopName,
                    email: email,
                    location: location,
                    phone: phone,
                    password: password,
                    images: imageArray,
                    salonFor: salonFor,
                    openTime: openTime,
                    closeTime: closeTime,
                },
            });

            // Handle the successful creation of the shop
            const shopId = data?.createShop?.id;
            console.log('Shop created with ID:', shopId);

            if (shopId) {
                Alert.alert("Your account has been created; please proceed to the sigin tab.")
            }

        } catch (err) {
            alert("ERROR : ", err)
            console.log(err);
        }
    };


    const getCurrentLocation = () => {
        dispatch({ type: TYPES.UpdateLocation, payload: "INDORE" })
    }

    const handleNameChange = (value: any) => {
        dispatch({ type: TYPES.UpdateName, payload: value });
    };

    const handleShopNameChange = (value: any) => {
        dispatch({ type: TYPES.UpdateShopName, payload: value });
    };

    const handleEmailChange = (value: any) => {
        dispatch({ type: TYPES.UpdateEmail, payload: value });
    };

    const handlePasswordChange = (value: any) => {
        dispatch({ type: TYPES.UpdatePassword, payload: value });
    };

    const handlePhoneChange = (value: any) => {
        dispatch({ type: TYPES.UpdatePhone, payload: value });
    };

    const handleOpenTime = (value: any) => {
        dispatch({ type: TYPES.UpdateOpenTime, payload: value });
    };

    const handleCloseTime = (value: any) => {
        dispatch({ type: TYPES.UpdateCloseTime, payload: value });
    };

    // const slideButtonsData = [
    //     "Personal Information",
    //     "Shop Information",
    //     "Operating Hours and Image",
    //     "Salon Services and Location"
    // ]

    return (
        <ScrollView showsVerticalScrollIndicator={false}
            style={styles.main} >

            <ScreenHeader />

            <Text style={styles.welcome} >Welcome buddy!</Text>

            <View style={styles.inputsContainer} >

                <Text style={styles.header} >Personal Information</Text>
                <PersonalInfo
                    handleNameChange={handleNameChange}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                />


                <Text style={styles.header} >Shop Information</Text>
                <ShopInfo
                    handleShopNameChange={handleShopNameChange}
                    handlePhoneChange={handlePhoneChange}
                />

                <Text style={styles.header} >Operating Hours and Image</Text>
                <TimeImage
                    handleOpenTime={handleOpenTime}
                    handleCloseTime={handleCloseTime}
                    imageArray={imageArray}
                    dispatch={dispatch}
                    type={TYPES.UpdateImageArray}
                />

                <Text style={styles.header} >Salon Services and Location</Text>
                <ServicesLocation
                    getCurrentLocation={getCurrentLocation}
                    dispatch={dispatch}
                />


            </View>
            <View style={styles.mt30} >
                {loading ? <Loader /> :
                    <PrimaryBtn
                        onPress={BTNCTA}
                        text={'SIGN UP'} />
                }
                <View style={styles.mt30} />
            </View>

        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#fff",
        flex: 1
    },
    mt20: {
        marginTop: 20
    },
    mt30: {
        marginTop: 30
    },
    inputsContainer: {
        marginHorizontal: 10,
        marginTop: 10
    },
    welcome: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: "Nunito",
        color: MCColor.heading,
        marginLeft: 10,
    },
    header: {
        fontFamily: "Nunito",
        fontWeight: '700',
        color: MCColor.primary,
        fontSize: 14,
        textDecorationColor: MCColor.primary,
        textDecorationLine: "underline",
        marginBottom: 6,
        marginTop: 20
    }
})