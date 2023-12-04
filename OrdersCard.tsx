import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { MCColor } from '../typography/MCColor'
import { useNavigation } from '@react-navigation/native'
import { GET_SERVICE_OVERVIEW_BY_ID } from '../graphql/Querys'
import { useQuery } from '@apollo/client'

interface I {
    item: any,
}

const OrdersCard: React.FC<I> = ({
    item,
}) => {

    const navigation = useNavigation();

    const serviceData = useQuery(GET_SERVICE_OVERVIEW_BY_ID, {
        variables: { serviceId: item?.serviceId }
    })

    const handleNavigaition = () => {
        navigation.navigate("BookingInfo", { itemId: item?.id })
    }

    return (
        <View style={styles.main} >
            <View style={[styles.flexBox, styles.borderBottom]} >
                <Text style={styles.name}>
                    {serviceData?.data?.service?.name} - ₹{serviceData?.data?.service?.price}
                </Text>
                <View style={styles.lableBox}>
                    <Text style={styles.status}>
                        PAID : {item?.orderStatus == "COMPLETED" ? "YES" :
                            item?.isPaid ? 'YES' : "NO"}
                    </Text>
                </View>
            </View>

            <View style={styles.bottomFlexBox}>
                <View>
                    <Text style={styles.lable}>Time</Text>
                    <Text style={[styles.lable, styles.value]}>{item?.time?.startAt}</Text>
                </View>

                <View>
                    <Text style={styles.lable}>Date</Text>
                    <Text style={[styles.lable, styles.value]}>{item?.date}</Text>
                </View>

                <View>
                    <Text style={styles.lable}>Order Status</Text>
                    <Text style={[styles.lable, styles.value]}>{item?.orderStatus}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleNavigaition} >
                <View style={styles.viewAllBtn} >
                    <Text style={styles.viewALl}>VIEW ALL DETAILS</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        borderRadius: 12,
        backgroundColor: MCColor.lightBlue,
        paddingHorizontal: 18,
        marginVertical: 10,
        paddingVertical: 10
    },
    flexBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: MCColor.heading,
        width: '100%',
        paddingBottom: 10
    },
    name: {
        color: MCColor.heading,
        fontSize: 18,
        fontWeight: '800',
        fontFamily: "Nunito"
    },
    lableBox: {
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        elevation: 8,
        shadowColor: MCColor.red,
        justifyContent: 'center'
    },
    status: {
        color: MCColor.heading,
        fontSize: 10,
        fontWeight: '700',
        fontFamily: "Nunito",
    },
    lable: {
        color: MCColor.primary,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: "Nunito"
    },
    value: {
        color: MCColor.heading,
        fontSize: 16,
        fontWeight: '700',
    },
    bottomFlexBox: {
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    viewAllBtn: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderColor: MCColor.blue,
        marginTop: 20
    },
    viewALl: {
        color: MCColor.heading,
        fontSize: 16,
        fontWeight: '600',
    }
})

export default OrdersCard