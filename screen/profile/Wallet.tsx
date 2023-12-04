import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ScreenHeader from '../../components/ScreenHeader';
import { MCColor } from '../../typography/MCColor';
import { useQuery } from '@apollo/client';
import { GET_ALLSERVICES_PRICE, WALLET_STATICS } from '../../graphql/Querys';
import { UserContext } from '../../utills/UserContextProvider';
import Loader from '../../components/common/Loader';
import ImportantCard from '../../components/ImportantCard';

interface WalletProps {
    navigation: any;
}

const Wallet: React.FC<WalletProps> = ({ navigation }) => {
    const { userId } = useContext(UserContext);

    const { data, loading } = useQuery(WALLET_STATICS, {
        variables: {
            filter: {
                shopId: userId
            }
        },
        fetchPolicy: 'network-only'
    })


    const { data: serviceData, loading: serviceLoading } = useQuery(GET_ALLSERVICES_PRICE, {
        variables: {
            shopId: userId
        },
        fetchPolicy: 'network-only'
    })

    const completedOrdersCount = data?.orders?.filter(
        (order: any) => order.orderStatus === "COMPLETED"
    ).length;

    const canceledOrdersCount = data?.orders?.filter(
        (order: any) => order.orderStatus === "CANCELED"
    ).length;

    const pendingOrdersCount = data?.orders?.filter(
        (order: any) => order.orderStatus === "PENDING"
    ).length;

    //Calculating earnings
    const completedOrders = data?.orders?.filter(
        (order: any) => order.orderStatus === "COMPLETED"
    );


    const totalEarning = completedOrders?.reduce((total: any, order: any) => {
        const service = serviceData?.servicesByShop.find(
            (service: any) => service.id === order.serviceId
        );
        return total + service?.price;
    }, 0);

    const DATA = [
        { lable: 'COMPLETED ORDERS', value: completedOrdersCount ? completedOrdersCount : 0 },
        { lable: 'PENDING ORDERS', value: pendingOrdersCount ? pendingOrdersCount : 0 },
        { lable: 'CANCELED ORDERS', value: canceledOrdersCount ? canceledOrdersCount : 0 },
    ]

    return (serviceLoading && loading ? <Loader /> :
        <ScrollView style={styles.main} >
            <ScreenHeader title='Wallet' navigation={navigation} />

            <View>

                <View style={styles.earningsContainer} >
                    <Text style={styles.header} >Your Total Earnings</Text>
                    <Text style={styles.earnedNum} >{`₹${totalEarning ? totalEarning : 0}`}</Text>
                </View>

                <Text style={[styles.header, styles.h2]} >Total Orders</Text>
                <FlatList
                    data={DATA}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <ImportantCard lable={item.lable} value={item.value} />
                    }
                />

            </View>
        </ScrollView >
    );
};

export default Wallet;


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    earningsContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: MCColor.lightBlue,
        margin: 20,
        borderRadius: 16

    },
    header: {
        fontSize: 20,
        fontFamily: 'Nunito',
        color: MCColor.heading,
        fontWeight: '700',
    },
    h2: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20
    },
    earnedNum: {
        fontSize: 32,
        fontFamily: 'Nunito',
        color: MCColor.darkGreen,
        fontWeight: '900',
        marginTop: 10
    }
});