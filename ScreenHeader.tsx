import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import SVGIcon from '../constans/SVG';
import { MCColor } from '../typography/MCColor';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
    title?: string;
    Icon?: any;
    mx?: string | number;
    onPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    Icon,
    mx = 8,
    onPress,
}) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.container, { marginHorizontal: mx }]}>
            {/* back and title */}
            <View style={styles.left}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SVGIcon
                        width={24}
                        height={24}
                        name='LeftArrowBlack'
                        fill='transparent'
                        strokeWidth='1.5'
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* for icon */}
            {Icon ? (
                <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
                    {Icon}
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default ScreenHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 18,
        color: MCColor.heading,
        marginLeft: 20
    },
    iconContainer: {},
});
