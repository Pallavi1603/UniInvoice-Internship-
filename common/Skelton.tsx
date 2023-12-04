import { Animated, FlatList, View } from 'react-native';
import React, { useEffect, useState, memo } from 'react';

interface ISkelton {
    h?: number,
    w?: number | string,
    br?: number,
    bg?: string,
    data?: Array<number | string>;
}

const Skeleton = ({ h = 300, w = 320, br = 0, bg = '#f7f7f7', data = [1] }: ISkelton) => {
    //Logic
    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ).start();
    }, [animation]);

    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1],
    });
    return (
        <View style={{ alignItems: 'center' }} >
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={() =>
                    <Animated.View style={[{
                        height: h,
                        width: w,
                        borderRadius: br,
                        marginHorizontal: 10,
                        backgroundColor: bg,
                    }, { opacity }]} />
                }
            />
        </View>
    );
};

export default memo(Skeleton);