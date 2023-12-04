import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_SERVICES_BY_LIMIT_HOMESCREEN } from '../../graphql/Querys'
import { UserContext } from '../../utills/UserContextProvider'
import ServiceCard from '../ServiceCard'
import { MCColor } from '../../typography/MCColor'
import Skelton from '../common/Skelton'

type Props = {}

const HomeScreenServices = (props: Props) => {

    const { userId, dispatch } = useContext(UserContext);

    const { data, loading, refetch } = useQuery(GET_SERVICES_BY_LIMIT_HOMESCREEN, {
        variables: {
            shopId: userId,
            serviceStatus: "ACTIVATED"
        },
        fetchPolicy: 'network-only'
    })
    const myData = [1, 2, 3,];
    useEffect(() => {
        dispatch({
            payload: refetch,
            type: "AllServicesRefetch"
        })
    }, [])



    return (
        <View style={styles.main} >
            <Text style={styles.header}>Services</Text>
            {loading ? <Skelton data={myData} h={200} w={160} br={10} /> :
                <FlatList
                    data={data?.filterServices.reverse()}
                    renderItem={({ item, index }) => {
                        return (
                            <ServiceCard item={item} />
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />}
        </View>
    )
}

export default HomeScreenServices

const styles = StyleSheet.create({
    main: {
        paddingTop: 12,
        backgroundColor: MCColor.gray,
        marginTop: 20
    },
    header: {
        fontWeight: '700',
        fontFamily: "Nunito",
        color: MCColor.heading,
        fontSize: 14,
        marginLeft: 16,
        marginBottom: 10
    }
})