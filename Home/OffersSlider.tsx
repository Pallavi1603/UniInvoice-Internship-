import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSlider from '../AppSlider'

const { width } = Dimensions.get('screen')


const OffersSlider = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container} >
            <AppSlider
                Data={Data}
                dotsContainerStyle={styles.dots}
                renderItem={({ item }) => {
                    return (
                        <Image
                            source={{ uri: item.img }}
                            style={styles.img}
                        />
                    )
                }}
            />
        </View>
    )
}

export default OffersSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        marginBottom: 100
    },
    img: {
        width: width - 20,
        height: 200,
        borderRadius: 16,
        marginHorizontal: 10
    },
    dots: {
        position: 'absolute',
        bottom: 8,
        zIndex: 99,
        alignSelf: 'center'
    }
})

const Data = [
    {
        img: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        img: "https://images.pexels.com/photos/3268732/pexels-photo-3268732.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        img: "https://images.pexels.com/photos/696285/pexels-photo-696285.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        img: "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        img: "https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
]