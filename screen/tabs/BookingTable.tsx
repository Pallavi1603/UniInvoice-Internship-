import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Navbar from '../../components/Home/Navbar'
import { MCColor } from '../../typography/MCColor'
import { useQuery } from '@apollo/client'
import { GET_ORDERS_TIME_DATA } from '../../graphql/Querys'

import { UserContext } from '../../utills/UserContextProvider'
import FilterBox from '../../components/FilterBox'
import { getFutureDates, todayDate } from '../../utills/Date'
import Loader from '../../components/common/Loader'
import EmptyImage from '../../components/common/EmptyImage'
import ImportantCard from '../../components/ImportantCard'
import { useNavigation } from '@react-navigation/native'

const BookingTable = () => {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext)
    const [currDate, setCurrDate] = useState(todayDate())

    const { data, loading, error } = useQuery(GET_ORDERS_TIME_DATA, {
        variables: {
            filter: currDate != "All" ? {
                shopId: userId,
                orderStatus: "PENDING",
                date: currDate,
            } : {
                shopId: userId,
                orderStatus: "PENDING",
            }
        },
        fetchPolicy: 'network-only'
    })

    return (loading ? <Loader /> :
        <View style={styles.main} >
            <View style={styles.headerCtr} >
                <Navbar lable='Your Upcoming Orders Time' />
            </View>

            <FilterBox
                onPress={(item) => setCurrDate(item)}
                data={[...getFutureDates(todayDate(), 5), "All",]}
                currentState={currDate}
            />


            <View style={styles.container} >
                <Text style={styles.h1} >Filtered By - {currDate === todayDate() ? "Today" : currDate}</Text>

                {!data?.orders?.length && <EmptyImage />}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    data={data?.orders}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("BookingInfo", { itemId: item?.id })} >
                                <View style={styles.card}>
                                    <ImportantCard
                                        lable={item.date}
                                        value={`${item?.time?.startAt} - ${item?.time?.endAt}`} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>


        </View>
    )
}

export default BookingTable

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#fff",
        flex: 1
    },
    headerCtr: {
        elevation: 14,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
        top: 5,
    },
    container: {
        marginTop: 80,
    },
    time: {
        fontFamily: "Nunito",
        fontWeight: "700",
        fontSize: 14,
        color: MCColor.heading
    },
    card: {
        marginBottom: 16
    },
    h1: {
        fontFamily: "Nunito",
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 20,
        color: MCColor.heading,
        textDecorationColor: MCColor.blue,
        textDecorationLine: "underline"
    }
})