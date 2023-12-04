import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MCColor } from '../../typography/MCColor'

type Props = {
    size?: number | string
}

const Loading = ({ size = 30 }: Props) => {
    return (
        <View style={styles.main} >
            <ActivityIndicator size={size} color={MCColor.primary} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    main: { flex: 1, justifyContent: "center", alignItems: "center" }
})