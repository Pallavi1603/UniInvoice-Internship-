import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ManOrWoman from '../profile/ManOrWoman'
import GetLocationBTN from '../buttons/GetLocationBTN';

type Props = {
    getCurrentLocation: any
    dispatch: any
}

const ServicesLocation = ({
    getCurrentLocation,
    dispatch
}: Props) => {

    const [currIndex, setCurrIndex] = useState(0);
    const optionData = ["MEN", "WOMEN", "BOTH"]
    useEffect(() => {
        dispatch({
            type: "UpdateSalonFor",
            payload: optionData[currIndex]
        })
    }, [currIndex])

    return (
        <View>
            <ManOrWoman
                currIndex={currIndex}
                setCurrIndex={setCurrIndex}
                data={optionData}
            />


            <GetLocationBTN
                onPress={getCurrentLocation}
            />

        </View>
    )
}

export default ServicesLocation

const styles = StyleSheet.create({
    mt20: {
        marginTop: 20
    }
})