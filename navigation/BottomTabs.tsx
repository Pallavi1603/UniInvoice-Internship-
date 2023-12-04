import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Orders from '../screen/tabs/Orders';
import { Image } from 'react-native';
import { MCColor } from '../typography/MCColor';
import HomeScreen from '../screen/tabs/HomeScreen';
import BookingTable from '../screen/tabs/BookingTable';

const BottomTabs = () => {
    const BottomTab = createBottomTabNavigator();

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? require('../../assets/home-active.png') : require('../../assets/home-inactive.png');
                    } else if (route.name === 'Orders') {
                        iconName = focused ? require('../../assets/order-active.png') : require('../../assets/order-inactive.png');
                    }
                    else if (route.name === 'Upcoming Orders') {
                        iconName = focused ? require('../../assets/bookingTable-active.png') : require('../../assets/bookingTable-inactive.png');
                    }

                    return <Image source={iconName} style={{ height: 24, width: 24 }} />;
                },
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    color: MCColor.heading,
                    fontWeight: '700',
                    fontFamily: "Nunito"
                },
            })}
        >
            <BottomTab.Screen name='Home' component={HomeScreen} />
            <BottomTab.Screen name='Orders' component={Orders} />
            <BottomTab.Screen name='Upcoming Orders' component={BookingTable} />
        </BottomTab.Navigator>
    );
};

export default BottomTabs;
