import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../screen/Auth/Auth';
import SplashScreen from '../screen/Auth/SplashScreen';
import BottomTabs from './BottomTabs';
import Onboarding from '../screen/Auth/Onboarding';
import Profile from '../screen/profile/Profile';
import Wallet from '../screen/profile/Wallet';
import Signup from '../screen/Auth/SignUp/Signup';
import BookingInfo from '../screen/BookingInfo';
import AddServices from '../screen/Home/AddServices';
import AllServices from '../screen/Home/AllServices';
import Rating from '../screen/Home/Rating';
import ServiceInfoModal from '../screen/Home/Modals/ServiceInfoModal';
import UpdatePassword from '../screen/Home/UpdatePassword';


const Appstack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'SplashScreen'}>

            <Stack.Screen name='Onboarding' component={Onboarding} />
            <Stack.Screen name='Auth' component={Auth} />
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='BottomTabs' component={BottomTabs} />

            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Wallet' component={Wallet} />

            <Stack.Screen name='AddServices' component={AddServices} />
            <Stack.Screen name='AllServices' component={AllServices} />
            <Stack.Screen name='Rating' component={Rating} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
            <Stack.Screen name='BookingInfo' component={BookingInfo} />

            <Stack.Screen
                name='ServiceInfoModal'
                options={() => ({ presentation: 'transparentModal' })}
                component={ServiceInfoModal} />
        </Stack.Navigator>
    )
}

export default Appstack