import React from 'react';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  Provider as PaperProvider, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { DrawerContent } from './Screens/DrawerContent';
import MainTabScreen from './Screens/MainTabScreen';
import OrderDetails from './Screens/OrderDetails';
import RouteDetails from './Screens/RouteDetails';
import ReturnDetails from './Screens/ReturnDetails';
import unproductive from './Screens/unproductive';
import moreshop from './Screens/moreshop';
import Profile from './Screens/ProfileScreen';
import Category from './Screens/Category';
import Cart from './Screens/Cart';
import product from './Screens/product';
import login from './Screens/login';
import RootStackScreen from './Screens/RootStackScreen';
import ProfileScreen from './Screens/ProfileScreen';
import {Users,UserContext} from './Context/context';
import {cart, CartContext} from './Context/context';
import ExploreScreen from "./Screens/ExploreScreen";


const Drawer = createDrawerNavigator();



const App = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    return (


<UserContext.Provider value={Users}>
    <CartContext.Provider value={cart}>
        <NavigationContainer >

            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Root" component={RootStackScreen} />
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>

                <Drawer.Screen name="OrderDetails" component={OrderDetails} />
                <Drawer.Screen name="RouteDetails" component={RouteDetails} />
                <Drawer.Screen name="ReturnDetails" component={ReturnDetails} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="unproductive" component={unproductive} />
                <Drawer.Screen name="moreshop" component={moreshop} />
                <Drawer.Screen name="Category" component={Category} />
                <Drawer.Screen name="Cart" component={Cart} />
                <Drawer.Screen name="product" component={product} />
                <Drawer.Screen name="login" component={login} />

            </Drawer.Navigator>
        </NavigationContainer>
    </CartContext.Provider>
</UserContext.Provider>
    )
}


export default App;


