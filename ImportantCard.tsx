import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MCColor } from '../typography/MCColor';

interface Props {
    lable: string;
    value: string | number | null;
}

const ImportantCard: React.FC<Props> = ({ lable, value }) => {
    return (
        <View style={styles.main}>
            <View style={styles.boldLine} />

            <View style={styles.content}>
                <Text style={styles.contentLable}>{lable}</Text>
                <Text style={styles.contentvalue}>{value}</Text>
            </View>
        </View>
    );
};

export default ImportantCard;

const styles = StyleSheet.create({
    main: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: `${MCColor.primary}40`,
        marginHorizontal: 7,
    },
    boldLine: {
        paddingVertical: 2,
        borderRadius: 50,
        backgroundColor: MCColor.primary,
        width: "100%",
    },
    contentLable: {
        fontSize: 14,
        fontFamily: "Nunito",
        fontWeight: '500',
        color: MCColor.heading,
    },
    contentvalue: {
        fontSize: 14,
        fontFamily: "Nunito",
        fontWeight: '800',
        color: MCColor.heading,
    },
    content: {
        marginTop: 6,
    },
});
