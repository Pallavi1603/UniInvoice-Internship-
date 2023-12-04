import { Image, StyleSheet, Text, TouchableOpacity, View, ImageStyle, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

interface GetLocationBTNProps {
    onPress: () => void;
    label?: string;
}

const GetLocationBTN: React.FC<GetLocationBTNProps> = ({ onPress, label = "Choose Your Shop location" }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.mt20, styles.location]} >
            <Text style={styles.locationLabel} >{label}</Text>
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/2875/2875433.png" }}
                style={styles.locationIMG}
            />
        </TouchableOpacity>
    )
}

export default GetLocationBTN

const styles = StyleSheet.create({
    location: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationIMG: {
        width: 28,
        height: 28,
        marginLeft: 10
    },
    locationLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: MCColor.heading
    },
    mt20: {
        marginTop: 20
    }
})
