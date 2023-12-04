import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputBox from '../InputBox'

type Props = {
    handleShopNameChange: (val: any) => void,
    handlePhoneChange: (val: any) => void,
}

const ShopInfo = ({
    handleShopNameChange,
    handlePhoneChange
}: Props) => {
    return (
        <View>
            <InputBox
                placehoder='Your Shop Name'
                onChangeText={handleShopNameChange}
                lable="Shop Name" />

            <View style={styles.mt20} >
                <InputBox
                    placehoder='Your Phone Number'
                    keyboardType={'numeric'}
                    onChangeText={handlePhoneChange}
                    lable="Phone Number" />
            </View>

        </View>
    )
}

export default ShopInfo

const styles = StyleSheet.create({
    mt20: {
        marginTop: 20
    }
})