import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import { MCColor } from '../../typography/MCColor';
import { useQuery } from '@apollo/client';
import { GET_RATING } from '../../graphql/Querys';
import { UserContext } from '../../utills/UserContextProvider';
import Loader from '../../components/common/Loader';

const Rating = () => {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext)

    const { data, loading, error } = useQuery(GET_RATING, {
        variables: {
            shopId: userId
        }
    });


    return (loading ? <Loader /> :
        <View style={styles.main} >
            <ScreenHeader navigation={navigation} title='Your Rating' />

            <View style={styles.reviewContainer} >
                <ReviewBar
                    lable='Service'
                    num={data.shop.rating.service}
                />
                <ReviewBar
                    lable='Price'
                    num={data.shop.rating.price}
                />
                <ReviewBar
                    lable='Shop Infrastructure'
                    num={data.shop.rating.shop}
                />
                <ReviewBar
                    lable='Behavior'
                    num={data.shop.rating.behavior}
                />
            </View>

            <Image
                style={styles.bannerImg}
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/757/757094.png" }}
            />
            <Text style={styles.header} >Boost Your User Rating and Unlock More Orders!</Text>
            <Text style={[styles.desc]} >
                Are you looking to take your business to the next level? Our exclusive membership program is designed to supercharge your user rating and attract a flood of new orders. With our cutting-edge tools and expert guidance, you'll gain a competitive edge, rise above the competition, and watch your profits soar. Our membership offers unparalleled benefits, including priority customer support, access to premium features, and a dedicated account manager to ensure your success. Don't miss out on this incredible opportunity to boost your business. Join our membership program today and experience the power of elevated ratings and increased orders!
            </Text>
        </View>
    )
}

export default Rating

const ReviewBar = ({ num, lable }: { num: number, lable: string }) => {

    const wid = {
        width: num ? num * 50 : 12
    }

    return (
        <View>
            <Text style={[styles.lable, styles.mt10]} >{lable}</Text>
            <View style={styles.flexBox} >
                <Text style={[
                    styles.lable,
                    styles.ratingNum,
                ]} >{num}</Text>
                <View style={[styles.bar, wid]} />
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/1828/1828884.png" }}
                    style={styles.starImg}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    reviewContainer: {
        borderRadius: 16,
        backgroundColor: MCColor.lightBlue,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: MCColor.gray,
        marginHorizontal: 10,
        marginTop: 20
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: MCColor.heading,
        marginBottom: 6,
        paddingBottom: 4
    },
    lable: {
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'Nunito',
        color: MCColor.heading,
    },
    header: {
        fontSize: 16,
        fontWeight: '800',
        fontFamily: 'Nunito',
        color: MCColor.heading,
        textAlign: 'center',
        marginVertical: 20
    },
    desc: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Nunito',
        color: MCColor.heading,
        textAlign: 'center',
    },
    bar: {
        paddingVertical: 4,
        backgroundColor: MCColor.primary,
        borderRadius: 50,
    },
    ratingNum: {
        marginLeft: 8,
        fontSize: 10,
        marginRight: 4,
        color: MCColor.primary
    },
    starImg: {
        height: 18,
        width: 18,
        marginLeft: 6
    },
    mt10: {
        marginTop: 10
    },
    bannerImg: {
        alignSelf: 'center',
        width: 60,
        height: 60,
        marginTop: 30
    }
})