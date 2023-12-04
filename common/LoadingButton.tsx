import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

const LoadingButton = ({ onPress }: { onPress: any }) => {
    return (
        <TouchableOpacity style={styles.flot} onPress={onPress}>
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/2805/2805355.png" }}
                style={styles.img}
            />
        </TouchableOpacity>
    )
}

export default LoadingButton

const styles = StyleSheet.create({
    img: {
        height: 26,
        width: 26
    },
    flot: {
        // position: 'absolute',
        // bottom: 20,
        // right: 20,
        padding: 4,
        borderRadius: 50,
        backgroundColor: MCColor.gray,
        alignSelf: "flex-end",
        marginRight: 10
    }
})