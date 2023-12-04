import { useContext, useReducer, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { UserContext } from '../../utills/UserContextProvider';
import ScreenHeader from '../../components/ScreenHeader';
import { useMutation } from '@apollo/client';
import { CreateServiceByShopID, Create_Services } from '../../graphql/Querys';
import InputBox from '../../components/InputBox';
import ManOrWoman from '../../components/profile/ManOrWoman';
import UploadImage from '../../components/profile/UploadImage';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

const initialState = {
    name: '',
    desc: '',
    price: 50,
    img: [],
    isDiscounted: false,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_DESC':
            return { ...state, desc: action.payload };
        case 'SET_PRICE':
            return { ...state, price: action.payload };
        case 'SET_IMG':
            return { ...state, img: action.payload };
        case 'SET_IS_DISCOUNTED':
            return { ...state, isDiscounted: action.payload };
        default:
            return state;
    }
};


const AddServices = ({ navigation }: { navigation: any }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [createService] = useMutation(CreateServiceByShopID);

    const [currIndex, setCurrIndex] = useState(0)
    const SwitchButtonData = ["YES", "NO"]

    const handleInputChange = (type: string, value: any) => {
        dispatch({ type, payload: value });
    };

    const { userId, allServicesRefetch } = useContext(UserContext)

    const handleSubmit = () => {
        const { name, desc, price, img, isDiscounted } = state;
        const priced = parseFloat(state.price);
        createService({
            variables: {
                shopId: userId,
                name: name,
                description: desc,
                price: priced,
                image: img,
                isDiscounted: SwitchButtonData[currIndex] == "YES" ? true : false,
            },
        })
            .then((response) => {
                alert("Service created");
                allServicesRefetch()
                navigation.goBack()
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error creating service:', error);
            });
    };

    const handleAddButton = () => {
        if (
            state.name.trim() === '' ||
            state.desc.trim() === '' ||
            state.price === 0 ||
            state.img.length == 0
        ) {
            Alert.alert('Please fill in all the fields');
            return
        } else {
            handleSubmit();
        }
    }


    return (
        <View style={styles.conatiner} >
            <ScreenHeader
                navigation={navigation}
                title={"Add Service"}
            />

            <ScrollView style={styles.inputsContainer} >

                <View style={styles.mt20} >
                    <InputBox
                        placehoder='Enter Your Service Name'
                        lable="Service Name"
                        onChangeText={(e) => handleInputChange('SET_NAME', e)}
                    />
                </View>

                <View style={styles.mt20} >
                    <InputBox
                        placehoder='Enter Your Service Description'
                        lable="Service Description"
                        onChangeText={(e) => handleInputChange('SET_DESC', e)}
                    />
                </View>

                <View style={styles.mt20} >
                    <InputBox
                        placehoder='Enter Your Service Price'
                        lable="Service Price ₹"
                        keyboardType={'numeric'}
                        onChangeText={(e) => handleInputChange('SET_PRICE', e)}
                    />
                </View>

                <View style={styles.mt20} >
                    <ManOrWoman
                        header='Discounted ?'
                        data={SwitchButtonData}
                        currIndex={currIndex}
                        setCurrIndex={setCurrIndex}
                    />
                </View>

                <View style={styles.mt20} >
                    <UploadImage
                        imageArray={state.img}
                        dispatch={dispatch}
                        type='SET_IMG'
                    />
                </View>
                <View style={styles.mt20} >
                    <PrimaryBtn
                        text='ADD'
                        onPress={handleAddButton}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default AddServices

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#fff',
        flex: 1
    },
    inputsContainer: {
        marginHorizontal: 20,
    },
    mt20: {
        marginTop: 20
    },
    png: {
        height: 80,
        width: 80
    }
})