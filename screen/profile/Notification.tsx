import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeader from '../../components/ScreenHeader'
import { useNavigation } from '@react-navigation/native'
import NotificationCard from '../../components/profile/NotificationCard'

const Notification = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.main} >
            <ScreenHeader navigation={navigation} title='Notifications' />

            <FlatList
                style={styles.flatlist}
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => {
                    return (<NotificationCard />)
                }}
            />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    flatlist: {
        marginHorizontal: 10
    }
})