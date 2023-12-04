import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ORDER_BY_ID, GET_SERVICE_BY_ID, GET_USERINFO_ORDER_DETAILS, UPDATE_ORDER_STATUS } from '../graphql/Querys'
import ScreenHeader from '../components/ScreenHeader'
import { MCColor } from '../typography/MCColor'
import ImportantCard from '../components/ImportantCard'
import AppSlider from '../components/AppSlider'
import Loader from '../components/common/Loader'
import PrimaryBtn from '../components/buttons/PrimaryBtn'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../utills/UserContextProvider'

type Props = {
    route: any
}

const { width } = Dimensions.get("screen")

const BookingInfo = ({ route }: Props) => {
    const { itemId } = route?.params || {}
    const navigation = useNavigation()
    const { ordersRefetch } = useContext(UserContext)

    const { data, loading } = useQuery(GET_ORDER_BY_ID, {
        variables: { orderId: itemId }
    })
    const [updateOrder] = useMutation(UPDATE_ORDER_STATUS);

    const cancelOrder = () => {
        updateOrderStatus(itemId, 'CANCELED');
        ordersRefetch();
    }
    const completeOrder = () => {
        updateOrderStatus(itemId, 'COMPLETED')
        ordersRefetch();
    }

    const updateOrderStatus = (orderId: any, status: string) => {
        updateOrder({
            variables: {
                updateOrderId: orderId,
                orderStatus: status,
            },
        })
            .then(async (response) => {
                response.data?.updateOrder?.id &&
                    alert("Order status updated successfully")

                navigation.goBack();
            })
            .catch((error) => {
                alert(error)
                navigation.goBack();
            });
    };

    return (loading ? <Loader /> :
        <ScrollView style={styles.main} >
            <ScreenHeader title='Booking Information' />

            <View style={styles.card} >
                <User id={data?.order?.userId} />
            </View>

            <View style={styles.massage} >
                <Text style={styles.desc}>Massage - {data?.order?.orderStatusDescription}</Text>
            </View>

            {data?.order?.orderStatus != 'COMPLETED' && data?.order?.orderStatus != 'CANCELED' &&
                <View style={[styles.btn, styles.mt10]} >
                    <PrimaryBtn
                        text='COMPLETED'
                        BtnStyle={styles.BtnStyle}
                        onPress={completeOrder}
                        color={MCColor.primary} />
                    <PrimaryBtn
                        BtnStyle={styles.BtnStyle}
                        text='CANCEL THIS ORDER'
                        onPress={cancelOrder}
                        color={MCColor.darkGray} />
                </View>}

            <View style={styles.card} >
                <Order data={data?.order} />
            </View>

            <View style={styles.card} >
                <ServiceInfo id={data?.order?.serviceId} />
            </View>

        </ScrollView>
    )
}

export default BookingInfo

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: '700',
        marginLeft: 10
    },
    name: {
        fontSize: 20,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: '700',
    },
    desc: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: "Nunito",
    },
    mt10: {
        marginTop: 10
    },
    card: {
        padding: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: MCColor.gray,
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: MCColor.lightBlue,
        elevation: 2,
    },
    userContainer: {
        flexDirection: "row",
        gap: 5
    },
    userImg: {
        height: 80,
        width: 80,
        marginHorizontal: 10,
        borderRadius: 50
    },
    massage: {
        alignSelf: "center"
    },
    serviceImg: {
        width: width - 60,
        height: 200,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    colorPrimary: {
        color: MCColor.primary
    },
    serviceContainer: {
        alignItems: "center"
    },
    dotsContainerStyle: {
        bottom: 6,
        position: "absolute",
        zIndex: 99,
        alignSelf: "center"
    },
    btn: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    BtnStyle: { width: "46%" }
})

const ServiceInfo = ({ id }: { id: string }) => {

    const { loading, data } = useQuery(GET_SERVICE_BY_ID, {
        variables: { serviceId: id }
    })
    const arrData = [
        { lable: "Discounted", value: data?.service?.isDiscounted ? "YES" : "NO" },
        { lable: "Service Status", value: data?.service?.serviceStatus },
        { lable: "Serive Estimated Time", value: `${data?.service?.serviceTime}MIN` },
    ]

    return (
        <View>
            <Text style={styles.header} >Service Info :</Text>
            <View style={styles.mt10} >
                <AppSlider
                    dotsContainerStyle={styles.dotsContainerStyle}
                    Data={data?.service?.image}
                    renderItem={({ item }: { item: string }) => {
                        return (
                            <View>
                                <Image
                                    source={{ uri: item }}
                                    style={styles.serviceImg}
                                />
                            </View>
                        )
                    }}
                />

            </View>
            <View style={[styles.serviceContainer, styles.mt10]} >
                <Text style={styles.name} >{data?.service?.name}</Text>
                <Text style={[styles.name, styles.colorPrimary]} >₹{data?.service?.price}</Text>

                <Text style={styles.desc} >Description : {data?.service?.description}</Text>
            </View>

            <FlatList
                data={arrData}
                style={styles.mt10}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <ImportantCard lable={item.lable} value={item.value} />
                    )
                }}
            />
        </View>
    )
}

const Order = ({ data }: { data: any }) => {

    const arrData = [
        { lable: "Start At", value: data?.time?.startAt },
        { lable: "End At", value: data?.time?.endAt },
        { lable: "Date", value: data?.date },
        { lable: "Payment Status", value: data?.isPaid ? "Paid" : "Not Paid" },
        { lable: "Order Status", value: data?.orderStatus },
    ]

    return (
        <View>
            <Text style={styles.header} >Booking Info :</Text>

            <FlatList
                data={arrData}
                style={styles.mt10}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <ImportantCard lable={item.lable} value={item.value} />
                    )
                }}
            />
        </View>
    )
}

const User = ({ id }: { id: string }) => {
    const { data, loading } = useQuery(GET_USERINFO_ORDER_DETAILS, {
        variables: { userByIdId: id }
    })

    return (
        <View style={styles.userContainer} >
            <Image
                source={{ uri: data?.user_by_id?.userImage }}
                style={styles.userImg}
            />

            <View>
                <Text style={[styles.name, styles.mt10]} >{data?.user_by_id?.firstName} {data?.user_by_id?.lastName}</Text>
                <Text style={styles.desc}>{data?.user_by_id?.phone}</Text>
            </View>
        </View>
    )
}