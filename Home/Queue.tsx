import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useId, useState } from 'react'
import { MCColor } from '../../typography/MCColor'
import { UserContext } from '../../utills/UserContextProvider'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_SHOP_QUEUE, UPDATE_SHOP_QUEUE } from '../../graphql/Querys'
import Loader from '../common/Loader'
import Skelton from '../common/Skelton'

const Queue = () => {

    const { userId } = useContext(UserContext);
    const { data, loading, error } = useQuery(GET_SHOP_QUEUE, {
        variables: {
            shopId: userId
        },
    })
    const [updateShop, { data: UpdatedData, loading: updateIsLoading }] = useMutation(UPDATE_SHOP_QUEUE);

    // const [number, setNumber] = useState(0);

    let number = UpdatedData
        ? UpdatedData?.updateShop?.queue
        : data?.shop?.queue


    const handleFuntions = (str: string) => {
        switch (str) {
            case "add":
                // setNumber(number + 1);
                handleQueueUpdate(number + 1)
                break;
            case "minus":
                if (number > 0) {
                    // setNumber(number - 1);
                    handleQueueUpdate(number - 1)
                }
                break;

            default:
                break;
        }
    }

    const handleQueueUpdate = async (newQueue: number) => {
        try {
            // Call the mutation
            await updateShop({
                variables: {
                    updateShopId: userId,
                    queue: newQueue
                }
            });

        } catch (error) {
            console.log('An error occurred:', error);
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.numberContainer} >
                {loading || updateIsLoading ?
                    <View style={styles.loaderContainer} >
                        <Loader color='#fff' styles={styles.loader} />
                    </View>
                    :
                    <Text style={styles.number} >
                        {UpdatedData
                            ? UpdatedData?.updateShop?.queue
                            : data?.shop?.queue}
                    </Text>
                }
            </View>

            <View style={styles.btnContainer} >
                <TouchableOpacity style={styles.btn}
                    onPress={() => handleFuntions("minus")}
                    disabled={loading || updateIsLoading}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/2801/2801932.png" }}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                    disabled={loading || updateIsLoading}
                    onPress={() => handleFuntions("add")}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/2997/2997933.png" }}
                        style={styles.img}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Queue

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        marginTop: 6,
        marginHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: MCColor.gray,
        paddingVertical: 20,
        backgroundColor: MCColor.lightBlue,
        elevation: 6,
        shadowColor: MCColor.red
    },
    number: {
        fontWeight: '900',
        fontFamily: "Nunito",
        fontSize: 50,
        color: "#fff"
    },
    numberContainer: {
        paddingHorizontal: 28,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: MCColor.primary,
        borderRadius: 50,
        elevation: 80,
        shadowColor: MCColor.primary
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        borderRadius: 16,
        backgroundColor: "#fff",
        padding: 8,
        marginHorizontal: 50,
        marginTop: -10
    },
    img: {
        height: 42,
        width: 42
    },
    loader: {
        backgroundColor: MCColor.primary,
    },
    loaderContainer: {
        paddingVertical: 15
    }
})