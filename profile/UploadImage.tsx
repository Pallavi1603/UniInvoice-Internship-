import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MCColor } from '../../typography/MCColor'
import { pickImage } from '../../utills/ImageToUrl';
import Loader from '../common/Loader';

interface UploadImageProps {
    lable?: string,
    data?: any,
    dispatch: any,
    imageArray: any,
    type: string
}

const UploadImage: React.FC<UploadImageProps> = ({ lable = "Upload Images", data, dispatch, imageArray, type }) => {

    const [isLoading, setIsLoading] = useState(false)

    const renderAddImages = () => {
        return (
            <TouchableOpacity onPress={() => pickImage(imageArray, dispatch, type, setIsLoading)} disabled={isLoading} >
                <Image
                    style={styles.imgSize}
                    source={require('../../../assets/ImgPlaceholder.png')}
                />
            </TouchableOpacity>
        )
    }

    const renderHeaderComponent = () => {
        return (isLoading ?
            <View style={[styles.imgSize, styles.colorGray]}>
                <Loader styles={styles.loaderStyle} size={20} />
            </View> : null
        )
    }

    const handleDelete = (index: number) => {
        const newImages = [...imageArray];
        newImages.splice(index, 1);
        dispatch({ type: type, payload: newImages });
    }

    return (
        <View>
            <Text style={styles.lable} >{lable}</Text>
            <FlatList
                data={data ? data : imageArray}
                horizontal
                ListHeaderComponent={renderHeaderComponent}
                ListFooterComponent={renderAddImages}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[styles.imgSize, styles.mx5]} >
                            <Image
                                style={styles.imgSize}
                                source={{ uri: `${item}` }}
                            />
                            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.crossContainer} >
                                <Image
                                    style={styles.crossImg}
                                    source={require('../../../assets/cross.png')}
                                />
                            </TouchableOpacity>
                        </View>)
                }
                }
            />
        </View>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    lable: {
        fontFamily: "Nunito",
        fontWeight: '500',
        color: MCColor.heading,
        marginBottom: 6,
        fontSize: 14
    },
    imgSize: {
        height: 80,
        width: 80
    },
    crossImg: {
        height: 20,
        width: 20,
    },
    crossContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 99
    },
    mx5: {
        marginHorizontal: 5
    },
    colorGray: {
        backgroundColor: MCColor.gray,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderStyle: {
        backgroundColor: MCColor.gray
    }
})

