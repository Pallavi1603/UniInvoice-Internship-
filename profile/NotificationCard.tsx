import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

const NotificationCard = () => {
    return (
        <View style={styles.main} >
            <Image
                source={{ uri: "https://images.pexels.com/photos/17027029/pexels-photo-17027029/free-photo-of-fashion-people-woman-relaxation.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" }}
                style={styles.img}
            />
            <View>
                <Text style={styles.h1} >
                    hey its title of the notification
                </Text>
                <Text style={styles.h2} >
                    hey its title of the notification hey its title of the notification hey its title of the notification hey
                </Text>
            </View>
        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    main: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: MCColor.primary,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: MCColor.lightBlue,
        flexDirection: 'row',
    },
    h1: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: '700'
    },
    h2: {
        fontSize: 12,
        color: MCColor.darkGray,
        fontFamily: "Nunito",
        fontWeight: '600',
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 16,
        marginRight: 10
    }
})