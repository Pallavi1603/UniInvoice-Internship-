import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect } from 'react'
import Navbar from '../../components/Home/Navbar'
import HomeFutuersButtons from '../../components/Home/HomeFeaturesButtons'
import TodaysStatics from '../../components/Home/TodaysStatics'
import OffersSlider from '../../components/Home/OffersSlider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../utills/UserContextProvider'
import { MCColor } from '../../typography/MCColor'
import { useNavigation } from '@react-navigation/native'
import HomeScreenServices from '../../components/Home/HomeScreenServices'

const HomeScreen = () => {
    const navigation = useNavigation();

    const { dispatch } = useContext(UserContext)

    const GetShopId = async () => {
        const shopId: any = await AsyncStorage.getItem('shopId');
        dispatch({
            type: "UpdateUserId",
            payload: shopId
        })
    };
    useEffect(() => {
        GetShopId();
    }, []);


    return (
        <View style={styles.main} >

            <StatusBar
                translucent={false}
                barStyle="dark-content"
            />

            <View style={styles.navBarContainer} >
                <Navbar />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}  >
                <HomeFutuersButtons />

                {/* <Text style={styles.header} >Your Shop Queue</Text> */}
                {/* <Queue /> */}

                <HomeScreenServices />

                <View style={styles.mt30} >
                    <TodaysStatics />
                </View>

                <OffersSlider navigation={navigation} />

            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#fff",
    },
    navBarContainer: {
        position: 'absolute',
        top: 8,
        width: '100%',
        zIndex: 10
    },
    container: {
        paddingTop: 80,
    },
    header: {
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: "Nunito",
        color: MCColor.heading,
        fontSize: 14,
        marginTop: 20
    },
    mt30: {
        marginTop: 30,
    }
})