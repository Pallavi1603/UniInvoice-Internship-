import React, { useState } from 'react'
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import { MCColor } from '../typography/MCColor'

type Props = {
    data?: any[],
    onPress?: (item: any) => void,
    currentState: string
}

const FilterBox = ({ data, onPress, currentState }: Props) => {

    const [isOpened, setIsOpened] = useState(false)
    const handleFilterIcon = () => { setIsOpened(!isOpened) }
    const handleItem = (item: any) => {
        onPress && onPress(item)
        handleFilterIcon()
    }

    return (
        <View style={styles.main} >
            <TouchableOpacity onPress={handleFilterIcon} style={styles.container} >
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/8873/8873283.png" }}
                    style={styles.img}
                />
            </TouchableOpacity>

            <Modal
                visible={isOpened}
                onRequestClose={handleFilterIcon}
                animationType="slide"
                transparent={true}
            >


                <TouchableOpacity style={styles.modalContainer} onPress={handleFilterIcon} >
                    <View style={styles.contentHeigth} >
                        <FlatList
                            data={data}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleItem(item)}>
                                        <Text
                                            style={[styles.item, currentState === item && styles.itemBg]} >{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={styles.seprator} />}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        zIndex: 99
    },
    container: {
        backgroundColor: MCColor.gray,
        borderRadius: 99,
        padding: 6
    },
    img: {
        height: 22,
        width: 22
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    item: {
        paddingVertical: 10,
        fontFamily: "Nunito",
        fontWeight: "700",
        color: MCColor.heading,
        textAlign: "center",
        marginHorizontal: 20,
        borderRadius: 8
    },
    itemBg: {
        backgroundColor: MCColor.lightBlue
    },
    contentHeigth: {
        position: "absolute",
        bottom: 10,
        width: "94%",
        alignSelf: "center",
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingVertical: 10
    },
    seprator: {
        borderBottomWidth: 1, borderColor: MCColor.gray,
        marginHorizontal: 20,
        marginVertical: 2
    }
})

export default FilterBox