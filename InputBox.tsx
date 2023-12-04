import { StyleSheet, Text, TextInput, TextInputProps, KeyboardAvoidingView, } from 'react-native'
import React from 'react'
import { MCColor } from '../typography/MCColor'

interface InputBoxProps extends TextInputProps {
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    placehoder: string,
    lable?: string,
    keyboardType?: any,
    bottomPlaceholder?: string,
    value?: string
}

const InputBox: React.FC<InputBoxProps> = ({
    onChangeText,
    secureTextEntry = false,
    placehoder,
    lable,
    keyboardType = 'ascii-capable',
    bottomPlaceholder,
    value
}) => {
    return (
        <KeyboardAvoidingView>
            {lable && <Text style={styles.lable} >{lable}</Text>}
            <TextInput
                keyboardType={keyboardType}
                placeholder={placehoder}
                secureTextEntry={secureTextEntry}
                style={styles.box}
                onChangeText={onChangeText}
                value={value}
            />
            {bottomPlaceholder ?
                <Text style={styles.fixedPlaceholder}>{bottomPlaceholder}</Text>
                : null}
            {/* its for Time Inputs */}
        </KeyboardAvoidingView>
    )
}

export default InputBox

const styles = StyleSheet.create({
    box: {
        fontFamily: "Nunito",
        fontWeight: '600',
        color: MCColor.heading,
        fontSize: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: MCColor.gray,
        paddingHorizontal: 20,
        backgroundColor: MCColor.lightBlue

    },
    lable: {
        fontFamily: "Nunito",
        fontWeight: '500',
        color: MCColor.heading,
        marginBottom: 6,
        fontSize: 14
    },
    fixedPlaceholder: {
        fontFamily: "Nunito",
        color: MCColor.heading,
        fontSize: 10,
        alignSelf: 'flex-end',
        fontWeight: '700'
    }
})
