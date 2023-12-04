import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenHeader from '../../components/ScreenHeader'
import { UserContext } from '../../utills/UserContextProvider'
import { useQuery } from '@apollo/client'
import { GET_SHOP_PROFILE_DATA } from '../../graphql/Querys'
import { MCColor } from '../../typography/MCColor'
import AppSlider from '../../components/AppSlider'
import ImportantCard from '../../components/ImportantCard'
import PrimaryBtn from '../../components/buttons/PrimaryBtn'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UpdatePassword from '../Home/UpdatePassword';

type Props = {}
const { width } = Dimensions.get("screen")

const Profile = ({navigation}: Props) => {
    const { userId, } = useContext(UserContext)

    const { data, loading, error } = useQuery(GET_SHOP_PROFILE_DATA, {
        variables: { shopId: userId }
    })

    const ImpComponentData = [
        { lable: "Salon For", value: data?.shop?.salonFor },
        { lable: "Number Of Seats", value: data?.shop?.numOfSeats },
        { lable: "Open Time", value: data?.shop?.openTime },
        { lable: "Close Time", value: data?.shop?.closeTime },
    ]

    return (
        <ScrollView style={styles.main} >
            <ScreenHeader title='Profile' />

            <View style={styles.container} >
                <Text style={styles.header} >Hi, {data?.shop?.ownerName}</Text>
                <Text style={styles.shopName} >{data?.shop?.shopName}</Text>

                <AppSlider
                    dotsContainerStyle={styles.dotStyle}
                    Data={data?.shop?.images}
                    renderItem={({ item }: { item: string }) => {
                        return (
                            <Image
                                source={{ uri: item }}
                                style={styles.img}
                            />
                        )
                    }}
                />

            </View>

            <View style={styles.mt10} >
                <IconInfo uri='https://cdn-icons-png.flaticon.com/128/732/732200.png' label={data?.shop?.email} />
                <IconInfo uri='https://cdn-icons-png.flaticon.com/128/5585/5585856.png' label={data?.shop?.phone} />
            </View>

            <View style={[styles.center, styles.mt10]} >
                <Text style={styles.label} >Shop Description : {data?.shop?.shopDescription}</Text>
            </View>

            <View style={styles.mt20} >
                <View style={styles.mt10} >
                    <Text style={[styles.label, styles.h2]} >Salon Information</Text>
                </View>
                <FlatList
                    style={styles.mt10}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={ImpComponentData}
                    renderItem={({ item }) => <ImportantCard lable={item.lable} value={item.value} />}
                />
            </View>

            <View style={styles.mt20} >
                <View style={styles.mt10} >
                    <PrimaryBtn text="Update Password" onPress={()=>navigation.navigate(UpdatePassword)} />
                </View>
                <View style={styles.mt10} >
                    <PrimaryBtn text="Edit Profile" color={MCColor.gray} textColor={MCColor.primary} />
                </View>
            </View>


        </ScrollView>
    )
}

export default Profile

const IconInfo = ({ uri, label }: { uri: string, label: string }) => {
    return (
        <View style={styles.flex} >
            <Image
                source={{ uri: uri }}
                style={styles.iconImg}
            />
            <Text style={styles.label} >{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: { backgroundColor: "#fff" },
    center: { alignSelf: "center" },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    header: {
        fontSize: 26,
        color: MCColor.blue,
        fontFamily: "Nunito",
        fontWeight: "800",
    },
    img: {
        height: width * 0.6,
        width: width * 0.6,
        borderRadius: 99,
        marginHorizontal: width * 0.2,
        marginTop: 10,
    },
    dotStyle: {
        position: "absolute",
        zIndex: 99,
        alignSelf: "center",
        bottom: 0
    },
    shopName: {
        fontSize: 16,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: "800",
        alignSelf: "center"
    },
    flex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: MCColor.gray,
        padding: 4,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 4,
        paddingHorizontal: 10,
        width: width * 0.6,
        marginTop: 10
    },
    mt10: { marginTop: 10 },
    mt20: { marginTop: 20 },
    iconImg: {
        height: 12,
        width: 12
    },
    label: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: "Nunito",
    },
    h2: {
        marginLeft: 10,
        fontWeight: '800'
    }
})