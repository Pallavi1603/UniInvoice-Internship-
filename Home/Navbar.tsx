import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FetchShopName } from '../../graphql/Querys';
import { useQuery } from '@apollo/client';
import { MCColor } from '../../typography/MCColor';
import Skelton from '../common/Skelton';
import { UserContext } from '../../utills/UserContextProvider';
import { useNavigation } from '@react-navigation/native';

interface NavbarProps {
    lable?: string
}

const Navbar: React.FC<NavbarProps> = ({ lable }) => {
    const navigation = useNavigation()
    const { userId } = useContext(UserContext);

    const { data, loading, error } = useQuery(FetchShopName, {
        variables: { shopId: userId },
        skip: lable || userId === "",
    });
    const handleNavigation = (navto: string) => {
        navigation.navigate(navto)
    }
    return (
        <View style={styles.main}>
            <View style={styles.flexBox}>
                <TouchableOpacity onPress={() => handleNavigation('Profile')}>
                    <Image
                        source={require('../../../assets/icons/profile.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                {loading ? (!lable &&
                    <View style={styles.skelton}>
                        <Skelton h={22} w={100} bg={MCColor.darkGray} br={7} />
                    </View>
                ) : (
                    <Text style={styles.name} numberOfLines={2}>
                        {lable ? lable : `Hi, ${data?.shop?.shopName}`}
                    </Text>
                )}

                <TouchableOpacity onPress={() => handleNavigation("Wallet")}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8738/8738841.png' }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Navbar;

const styles = StyleSheet.create({
    main: {
        backgroundColor: MCColor.primary,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        height: 30,
        width: 30,
    },
    name: {
        fontSize: 16,
        fontFamily: "Nunito",
        fontWeight: '700',
        color: "#fff",
        textAlign: 'center',
        width: '80%',
    },
    skelton: {
        alignSelf: 'center',
        marginTop: 4,
    },
});
