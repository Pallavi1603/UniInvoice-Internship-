import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MCColor } from '../../typography/MCColor'
import SlideButton from '../../components/buttons/SlideButton'
import OrdersCard from '../../components/OrdersCard'
import { useQuery } from '@apollo/client'
import { GET_ORDER_BY_FILTER } from '../../graphql/Querys'
import { UserContext } from '../../utills/UserContextProvider'
import Loader from '../../components/common/Loader'
import LoadingButton from '../../components/common/LoadingButton'
import EmptyImage from '../../components/common/EmptyImage'
import VirtulizedView from '../../components/common/VirtulizedView'
import Navbar from '../../components/Home/Navbar'
import { getFutureDates, getPastDates, todayDate } from '../../utills/Date'
import FilterBox from '../../components/FilterBox'

const Orders = () => {
    const [currIndex, setCurrIndex] = useState("PENDING");
    const [isLoading, setIsLoading] = useState(false);
    const [curr, setCurr] = useState("All")

    const { userId, dispatch } = useContext(UserContext)

    const { data, loading, refetch } = useQuery(GET_ORDER_BY_FILTER, {
        variables: curr != "All" ? {
            filter: {
                shopId: userId,
                date: curr,
                orderStatus: currIndex
            }
        } : {
            filter: {
                shopId: userId,
                orderStatus: currIndex
            }
        },
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        dispatch({
            type: "OrdersRefetch",
            payload: refetch
        })
    }, [])


    const handleButtons = (index: string) => { setCurrIndex(index) }

    const slideData = ["PENDING", "COMPLETED", "CANCELED"]

    const filteredOrders = data?.orders?.filter((item: any) => item?.orderStatus === currIndex);


    return (
        <View style={styles.main} >
            <View style={styles.headerCtr} >
                <Navbar lable='Your Orders' />
            </View>

            <FilterBox
                onPress={(item) => setCurr(item)}
                data={[...getFutureDates(todayDate(), 5), "All", ...getPastDates(todayDate(), 5)]}
                currentState={curr}
            />

            <VirtulizedView>

                <FlatList
                    data={slideData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatlist}
                    renderItem={({ item }) => {
                        return (
                            <SlideButton
                                item={item}
                                isActive={item === currIndex}
                                onPress={() => handleButtons(item)}
                            />)
                    }}
                />

                <Text style={styles.h1} >Filtered By - {curr}</Text>

                {filteredOrders?.length === 0 && <EmptyImage />}

                {loading || isLoading ? <Loader /> :
                    <FlatList
                        data={filteredOrders}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist2}
                        renderItem={({ item }) => {
                            return (
                                <OrdersCard
                                    item={item}
                                />
                            )
                        }
                        }
                    />
                }
            </VirtulizedView>
        </View>
    )
}

export default Orders


const styles = StyleSheet.create({
    main: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    headerCtr: {
        elevation: 14,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
        top: 5,
    },
    flatlist: {
        marginVertical: 20,
        alignSelf: 'center',
        marginTop: 80
    },
    flatlist2: {
        marginHorizontal: 12,
        marginTop: 10
    },
    h1: {
        fontFamily: "Nunito",
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 10,
        color: MCColor.heading,
        textDecorationColor: MCColor.blue,
        textDecorationLine: "underline"
    }
})