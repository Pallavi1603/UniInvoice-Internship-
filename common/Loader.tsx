import React from 'react';
import { Image, View, ViewStyle } from 'react-native';

type LoaderProps = {
    size?: number;
    styles?: ViewStyle;
};

const Loader: React.FC<LoaderProps> = ({
    size = 36,
    styles = {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
}) => {
    return (
        <View style={styles}>
            <Image
                source={require('../../../assets/loading.gif')}
                style={{
                    height: size,
                    width: size,
                }}
            />
        </View>
    );
};

export default Loader;
