import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

interface ISlideButton {
    item: string | number,
    onPress: any,
    isActive: boolean
}

const SlideButton: React.FC<ISlideButton> = ({ item, onPress, isActive }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={[styles.btn, isActive && styles.bgPrimary]} >
                <Text style={[styles.txt, isActive && styles.white]} >{item}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SlideButton

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        borderColor: MCColor.primary,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 26,
        paddingVertical: 8,
        marginHorizontal: 10
    },
    txt: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: "700"
    },
    bgPrimary: {
        backgroundColor: MCColor.primary
    },
    white: {
        color: "#fff"
    }
})