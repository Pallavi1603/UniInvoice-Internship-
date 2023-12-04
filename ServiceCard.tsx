import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MCColor } from '../typography/MCColor';

interface IProps {
    item: any;
}

const ServiceCard: React.FC<IProps> = ({ item }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate('ServiceInfoModal', { item });
    };

    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container} >
                <Image source={{ uri: item?.image?.[0] }} style={styles.bgImage} />

                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={1} >{item?.name}</Text>
                    <Text style={styles.price}>₹{item?.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(ServiceCard);

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 160,
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
        marginHorizontal: 8,
        marginBottom: 20
    },
    textContainer: {
        width: '100%',
        marginTop: 10
    },
    bgImage: {
        width: '100%',
        height: '74%',
        borderRadius: 10,
    },
    name: {
        fontSize: 14,
        color: MCColor.heading,
        fontFamily: 'Nunito',
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    price: {
        fontSize: 12,
        color: MCColor.primary, // Use the appropriate MCColor value
        fontFamily: 'Nunito',
        fontWeight: '700',
    },
});
