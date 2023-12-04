import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

interface ManOrWomanProps {
    data: Array<number | string>
    currIndex: number | string
    setCurrIndex: (index: number) => void
    header?: string
}

const ManOrWoman = React.memo(({
    data,
    currIndex,
    setCurrIndex,
    header = "Salon For"
}: ManOrWomanProps) => {

    return (
        <>
            <Text style={styles.lable} >{header}</Text>
            <View style={styles.container} >

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setCurrIndex(index)}
                                style={[
                                    styles.btnStruc,
                                    currIndex === index && styles.bgPrimary,
                                ]} >
                                <Text style={[styles.textStruc, currIndex === index && styles.textPrimary]} >{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
        </>
    )
})

export default ManOrWoman

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnStruc: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: MCColor.gray,
        marginHorizontal: 6,
        borderRadius: 8
    },
    bgPrimary: {
        backgroundColor: MCColor.primary
    },
    textPrimary: {
        color: "#FFFFFF"
    },
    textStruc: {
        fontSize: 12,
        fontFamily: "Nunito",
        fontWeight: '700',
        color: MCColor.heading
    },
    lable: {
        fontFamily: "Nunito",
        fontWeight: '500',
        color: MCColor.heading,
        fontSize: 14,
        marginBottom: 6,
    },

})