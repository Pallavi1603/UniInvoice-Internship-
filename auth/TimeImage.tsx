import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChooseTime from '../profile/ChooseTime';
import UploadImage from '../profile/UploadImage';

type Props = {
    handleOpenTime: (val: any) => void;
    handleCloseTime: (val: any) => void;
    imageArray: [string] | any,
    dispatch: any,
    type: string
}

const TimeImage = ({
    handleOpenTime,
    handleCloseTime,
    type,
    dispatch,
    imageArray,
}: Props) => {
    return (
        <View>
            <ChooseTime
                lable={"Shop Timing"}
                onChangeText1={handleOpenTime}
                onChangeText2={handleCloseTime}
            />

            <View style={styles.mt20} >
                <UploadImage
                    imageArray={imageArray}
                    dispatch={dispatch}
                    type={type}
                />
            </View>
        </View>
    )
}

export default TimeImage

const styles = StyleSheet.create({
    mt20: {
        marginTop: 20
    }
})