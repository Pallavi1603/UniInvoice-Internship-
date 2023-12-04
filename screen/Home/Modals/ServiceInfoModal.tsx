import { Text, Image, StyleSheet, Dimensions, View } from 'react-native'
import React, { useContext } from 'react'
import ModalWrapper from '../../../components/common/ModalWrapper'
import AppSlider from '../../../components/AppSlider'
import { MCColor } from '../../../typography/MCColor'
import PrimaryBtn from '../../../components/buttons/PrimaryBtn'
import { useMutation } from '@apollo/client'
import { DEACTIVATE_THE_SERVICE } from '../../../graphql/Querys'
import Loader from '../../../components/common/Loader'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../utills/UserContextProvider'
import Loading from '../../../components/common/Loading'

const { width } = Dimensions.get('screen')

const ServiceInfoModal = ({ route }: { route: any }) => {
    const { item } = route?.params || {}
    const { userId, allServicesRefetch } = useContext(UserContext);
    const navigation = useNavigation();
    const [updateService, { data, loading, error }] = useMutation(DEACTIVATE_THE_SERVICE);

    const handleDelete = async () => {
        try {
            await updateService({
                variables: {
                    serviceStatus: "DEACTIVATED",
                    shopId: userId,
                    updateServiceId: item.id,
                },
            })
            navigation.goBack();
            allServicesRefetch();

        } catch (error: any) {
            alert(error)
        }
    }

    return (
        <>
            <ModalWrapper>
                <Text style={styles.header} >{item.name}</Text>

                <AppSlider
                    Data={item.image}
                    dotsContainerStyle={styles.dots}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                source={{ uri: item }}
                                style={styles.img}
                            />
                        )
                    }}
                />

                <Text style={styles.price} >Price : ₹{item.price}</Text>
                <Text style={[styles.price, styles.descColor]} >
                    Description&nbsp;:&nbsp;{item.description}
                </Text>


            </ModalWrapper>

            <View style={styles.btnContainer} >
                {loading ? <Loading size={30} /> :
                    <PrimaryBtn color={MCColor.red} text={'DELETE'} onPress={handleDelete} />
                }
            </View>

        </>
    )
}

export default ServiceInfoModal

const styles = StyleSheet.create({
    img: {
        width: width * 0.84, height: 180, borderRadius: 10, marginHorizontal: width * 0.03
    },
    imgContainer: {
        marginHorizontal: 20,
    },
    header: {
        marginVertical: 20,
        fontWeight: '700',
        fontFamily: "Nunito",
        color: MCColor.heading,
        alignSelf: 'center',
        fontSize: 28,
        textTransform: 'uppercase'
    },
    dots: {
        top: 196,
        zIndex: 99,
        alignItems: "center"
    },
    price: {
        fontSize: 20,
        color: MCColor.primary,
        alignSelf: 'center',
        marginTop: 36,
        fontWeight: '600'
    },
    descColor: {
        color: MCColor.heading,
        fontWeight: '500',
        marginHorizontal: 8,
        marginTop: 10,
        fontSize: 12
    },
    btnContainer: {
        position: "absolute",
        width: '80%',
        alignSelf: "center",
        bottom: 20
    }

})