import { StyleSheet, Text, TouchableHighlight, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { MCColor } from '../../typography/MCColor'

interface PrimaryBtnProps {
    onPress?: () => void;
    text: string | ReactNode;
    color?: string;
    textColor?: string;
    BtnStyle?: ViewStyle
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
    onPress, text, color = MCColor.primary, textColor = "#fff", BtnStyle
}) => {
    const inlineStyles = StyleSheet.create({
        color: {
            backgroundColor: color
        },
        textColor: {
            color: textColor
        }
    })
    return (
        <TouchableHighlight
            style={[styles.container, inlineStyles.color, BtnStyle]}
            onPress={onPress} >
            <Text style={[styles.text, inlineStyles.textColor]}>{text}</Text>
        </TouchableHighlight>
    )
}

export default PrimaryBtn

const styles = StyleSheet.create({
    container: {
        backgroundColor: MCColor.primary,
        borderRadius: 16,
        width: "92%",
        alignSelf: 'center',
        paddingVertical: 12,
    },
    text: {
        color: "#fff",
        fontFamily: "Nunito",
        fontWeight: '700',
        fontSize: 16,
        alignSelf: 'center',
    }
})