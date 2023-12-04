import { View, ViewStyle, VirtualizedList } from 'react-native';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    style?: ViewStyle;
};

const VirtulizedView = ({ children, style }: Props) => {
    return (
        <VirtualizedList
            showsVerticalScrollIndicator={false}
            style={style}
            data={[{}]}
            initialNumToRender={1}
            renderItem={() => (
                <View>
                    {children}
                </View>
            )}
            keyExtractor={(item) => item.toString()}
            getItemCount={() => 1}
            getItem={() => 1}
        />
    );
};

export default VirtulizedView;
