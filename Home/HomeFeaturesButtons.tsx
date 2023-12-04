import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { MCColor } from '../../typography/MCColor';
import { useNavigation } from '@react-navigation/native';

interface CreateButtonProps {
    onPress: () => void;
    uri: string;
    label: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onPress, uri, label }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Image source={{ uri }} style={styles.img} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const HomeFeaturesButtons: React.FC = () => {
    const navigation = useNavigation();

    const handleAddServices = () => {
        navigation.navigate('AddServices');
    };
    const handleAllServices = () => {
        navigation.navigate('AllServices');
    };
    const handleReviews = () => {
        navigation.navigate('Rating');
    };

    return (
        <View style={styles.flexBox}>
            <CreateButton
                uri="https://cdn-icons-gif.flaticon.com/8716/8716767.gif"
                label="Add Services"
                onPress={handleAddServices}
            />
            <CreateButton
                uri="https://cdn-icons-gif.flaticon.com/10971/10971310.gif"
                label="All Services"
                onPress={handleAllServices}
            />
            <CreateButton
                uri="https://cdn-icons-gif.flaticon.com/10051/10051247.gif"
                label="Rating"
                onPress={handleReviews}
            />
        </View>
    );
};

export default HomeFeaturesButtons;

const styles = StyleSheet.create({
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 14,
        width: '25%',
        elevation: 18,
        shadowColor: MCColor.blue,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'Nunito',
        textAlign: 'center',
        marginTop: 4,
        color: MCColor.heading,
    },
    img: {
        height: 32,
        width: 32,
        alignSelf: 'center',
    },
});
