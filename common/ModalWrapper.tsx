import React from "react";
import { VirtualizedList, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ModalWrapperProps {
    children: React.ReactNode;
    fullBg?: string;
    lowerBg?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    children,
    fullBg = "#00000099",
    lowerBg = "white",
}) => {
    const navigation = useNavigation();

    const goBackCTA = () => {
        navigation.goBack();
    };

    const inlinStyles = StyleSheet.create({
        main: { flex: 1, backgroundColor: fullBg },
        container: {
            flex: 1,
        },
        viewContainer: {
            backgroundColor: lowerBg,
            borderRadius: 20,
            position: 'absolute',
            width: '90%',
            alignSelf: 'center',
            bottom: 100,
            paddingBottom: 20,
            zIndex: 99
        },
    });

    return (
        <View style={inlinStyles.main}>

            <TouchableOpacity style={inlinStyles.container} onPress={goBackCTA} />

            <VirtualizedList
                style={inlinStyles.viewContainer}
                data={[{}]}
                initialNumToRender={1}
                renderItem={({ item }) => (
                    <View>
                        {children}
                    </View>
                )}
                keyExtractor={(item) => item.toString()}
                getItemCount={() => 1}
                getItem={() => ({})}
            />
        </View>
    );
};

export default ModalWrapper;