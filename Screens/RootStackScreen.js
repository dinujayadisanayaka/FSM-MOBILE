import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './login';
import MainTabScreen from './MainTabScreen';
import moreshop from "./moreshop";
import ExploreScreen from "./ExploreScreen";
import Category from "./Category";
import product from "./product";
import DetailsScreen from "./DetailsScreen";
import {cart} from "../Context/context";
import Cart from "./Cart";
import {DrawerContent} from "./DrawerContent";
import Totalsales from "./Totalsales";
import SelectDate from "./SelectDate";
import Totalitems from "./Totalitems"
import BillsFromShops from "./BillsFromShops";
import RouteDetails from "./RouteDetails";
import AllShops from "./AllShops";
import OrderDetails from "./OrderDetails";
import OrderDescription from "./OrderDescription";
import AllRouteDetails from "./AllRouteDetails";
import VehicleStock from "./VehicleStock";

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="login" component={SplashScreen}/>
        <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
        <RootStack.Screen name="ExploreScreen" component={ExploreScreen}/>
        <RootStack.Screen name="RouteDetails" component={RouteDetails}/>
        <RootStack.Screen name="moreshop" component={moreshop}/>
        <RootStack.Screen name="DetailsScreen" component={DetailsScreen}/>
        <RootStack.Screen name="Category" component={Category}/>
        <RootStack.Screen name="product" component={product}/>
        <RootStack.Screen name="cart" component={Cart}/>
        <RootStack.Screen name="DrawerContent" component={DrawerContent}/>
        <RootStack.Screen name="SelectDate" component={SelectDate}/>
        <RootStack.Screen name="Totalsales" component={Totalsales}/>
        <RootStack.Screen name="Totalitems" component={Totalitems}/>
        <RootStack.Screen name="BillsFromShops" component={BillsFromShops}/>
        <RootStack.Screen name="AllShops" component={AllShops}/>
        <RootStack.Screen name="OrderDetails" component={OrderDetails}/>
        <RootStack.Screen name="OrderDescription" component={OrderDescription}/>
        <RootStack.Screen name="AllRouteDetails" component={AllRouteDetails}/>
        <RootStack.Screen name="VehicleStock" component={VehicleStock}/>

    </RootStack.Navigator>
);

export default RootStackScreen;
