import { StyleSheet, View } from 'react-native'
import React from 'react'
import InputBox from '../InputBox'

type Props = {
    handleNameChange: (value: any) => void,
    handleEmailChange: (value: any) => void,
    handlePasswordChange: (value: any) => void,
}

const PersonalInfo = ({
    handleNameChange,
    handleEmailChange,
    handlePasswordChange }: Props) => {
    return (
        <View>
            <InputBox
                placehoder='Your Full Name'
                onChangeText={handleNameChange}
                lable="Full Name" />

            <View style={styles.mt20} >
                <InputBox
                    placehoder='Your Email'
                    onChangeText={handleEmailChange}
                    lable="Email" />
            </View>

            <View style={styles.mt20} >
                <InputBox
                    placehoder='Your Password'
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    lable="Password" />
            </View>

        </View>
    )
}

export default PersonalInfo

const styles = StyleSheet.create({
    mt20: {
        marginTop: 20
    }
})