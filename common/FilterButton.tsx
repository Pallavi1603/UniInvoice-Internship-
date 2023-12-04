import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MCColor } from '../../typography/MCColor'

type Props = {
    curr: number | string
    setCurr: (e: string | number) => void
}

const FilterButton = ({ curr, setCurr }: Props) => {

    const [isOpened, setIsOpened] = useState(false)

    const data = ["Today", "All"]

    const openDrawer = () => { setIsOpened(!isOpened) }

    return (
        <TouchableOpacity onPress={openDrawer} >
            <View style={styles.FilterButton} >
                <View style={styles.flexBox} >
                    <Text style={styles.filterLable} >{curr}</Text>
                    <Image
                        style={styles.image}
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/57/57055.png" }}
                    />
                </View>
                {isOpened &&
                    <FlatList
                        data={data}
                        style={styles.contentContainerStyle}
                        renderItem={({ item, index }) =>
                            <Text onPress={() => setCurr(item)}
                                style={[styles.filterLable, styles.mv]} >{item}</Text>
                        }
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

export default FilterButton

const styles = StyleSheet.create({
    FilterButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    filterLable: {
        fontSize: 12,
        color: MCColor.heading,
        fontFamily: "Nunito",
        fontWeight: "900",
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: MCColor.primary,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 2,
        backgroundColor: MCColor.lightBlue,
    },
    mv: {
        marginTop: 10,
    },
    contentContainerStyle: {
        backgroundColor: MCColor.lightBlue,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    image: {
        height: 12,
        width: 12,
        marginLeft: 8
    }
})