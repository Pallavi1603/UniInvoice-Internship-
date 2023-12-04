import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MCColor } from '../../typography/MCColor'
import { UserContext } from '../../utills/UserContextProvider'
import { useQuery } from '@apollo/client'
import { GET_TODAYS_ORDER } from '../../graphql/Querys'
import Skelton from '../common/Skelton'
import { todayDate } from '../../utills/Date'

const TodaysStatics = () => {

    const { userId } = useContext(UserContext)

    const { data, loading, error } = useQuery(GET_TODAYS_ORDER, {
        variables: {
            filter: {
                shopId: userId,
                date: todayDate(),
            }
        },
        fetchPolicy: 'network-only'
    })

    const pendingCount = data?.orders?.filter((order: any) => order.orderStatus === "PENDING").length;
    const completedCount = data?.orders?.filter((order: any) => order.orderStatus === "COMPLETED").length;


    return (
        <>
            <Text style={styles.lable}  >Todays Statics</Text>

            <View style={styles.container} >

                <View style={styles.headerContainer} >
                    <View style={styles.headerItem} >
                        <Text style={[styles.lable, styles.itemsLable]} >IN PENDING</Text>
                    </View>
                    <View style={styles.headerItem} >
                        <Text style={[styles.lable, styles.itemsLable]} >COMPLETED</Text>
                    </View>
                </View>

                <View style={[styles.staticsDataConatiner, styles.headerContainer]} >
                    <View style={styles.staticItem} >
                        {loading ?
                            <Skelton
                                h={40}
                                bg='#fff'
                                w={100}
                                br={10}
                            /> :
                            <Text style={[styles.lable, styles.size30]} >
                                {pendingCount ? pendingCount : 0}
                            </Text>}
                    </View>
                    <View style={styles.staticItem} >
                        {loading ?
                            <Skelton
                                h={40}
                                bg='#fff'
                                w={100}
                                br={10}
                            /> :
                            <Text style={[styles.lable, styles.size30]} >
                                {completedCount ? completedCount : 0}
                            </Text>
                        }
                    </View>
                </View>

            </View>
        </>
    )
}

export default TodaysStatics

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: MCColor.gray,
        elevation: 6,
        shadowColor: MCColor.blue,
        backgroundColor: MCColor.lightBlue,
        marginTop: 6,
    },
    lable: {
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: "Nunito",
        color: MCColor.heading,
        fontSize: 14,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerItem: {
        borderRadius: 16,
        width: "50%",
        paddingVertical: 10,
        backgroundColor: MCColor.primary,
        marginHorizontal: 6,
        elevation: 9,
    },
    itemsLable: {
        fontSize: 16,
        color: '#FFF',
    },
    staticsDataConatiner: {
        paddingVertical: 10
    },
    staticItem: {
        width: "50%",
    },
    size30: {
        fontSize: 30
    },

})