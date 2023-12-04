import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import ScreenHeader from '../../components/ScreenHeader'
import { useQuery } from '@apollo/client'
import { GET_SERVICES_BY_LIMIT_HOMESCREEN } from '../../graphql/Querys'
import { UserContext } from '../../utills/UserContextProvider'
import ServiceCard from '../../components/ServiceCard'
import Loader from '../../components/common/Loader'
import EmptyImage from '../../components/common/EmptyImage'
import { MCColor } from '../../typography/MCColor'

const AllServices = () => {

    const { userId } = useContext(UserContext);

    const { data, loading, refetch } = useQuery(GET_SERVICES_BY_LIMIT_HOMESCREEN, {
        variables: {
            shopId: userId,
            serviceStatus: "ACTIVATED"
        },
        fetchPolicy: 'network-only'
    })

    return (
        <View style={styles.main} >
            <ScreenHeader title='All Services' />
            {loading ? <Loader /> :
                <View style={styles.container} >
                    {data?.filterServices?.length === 0 && <EmptyImage />}

                    <FlatList
                        data={data?.filterServices}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ServiceCard item={item} />}
                    />
                </View>}

        </View>
    )
}

export default AllServices

const styles = StyleSheet.create({
    container: {
        backgroundColor: MCColor.gray,
        alignItems: 'center',
        paddingTop: 20,
        flex: 1,
    },
    main: {
        flex: 1,
        backgroundColor: '#fff',
    }
})