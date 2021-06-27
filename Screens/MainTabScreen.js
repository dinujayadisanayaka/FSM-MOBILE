import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import RouteDetails from './RouteDetails';
import ReportScreen from './ReportScreen';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import {View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AllShops2 from "./AllShops2";



const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ReportStack = createStackNavigator();
const RouteStack = createStackNavigator();
const ExploreStack  = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#0872ce',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={25} />
                ),
            }}
        />

        <Tab.Screen
            name="Route"
            component={RouteStackScreen}
            options={{
                tabBarLabel: 'Route',
                tabBarColor: '#0872ce',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIconsIcon name="directions-fork" size={30} color="#FFFFFF"></MaterialCommunityIconsIcon>
                ),
            }}
        />


        <Tab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
                tabBarLabel: 'Shop',
                tabBarColor: '#0872ce',
                tabBarIcon: ({ color }) => (
                    <MaterialIconsIcon name="store" size={30} color="#FFFFFF"></MaterialIconsIcon>
                ),
            }}
        />


        {/*<Tab.Screen*/}
        {/*    name="Notifications"*/}
        {/*    component={DetailsStackScreen}*/}
        {/*    options={{*/}
        {/*        tabBarLabel: 'Order',*/}
        {/*        tabBarColor: '#0872ce',*/}
        {/*        // tabBarIcon: ({ color }) => (*/}
        {/*        //     <Ionicons name="ios-cart" size={25} color="#FFFFFF" />*/}
        {/*        // ),*/}
        {/*    }}*/}
        {/*/>*/}


        <Tab.Screen
            name="Report"
            component={ReportStackScreen}
            options={{
                tabBarLabel: 'Report',
                tabBarColor: '#0872ce',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="ios-create" size={28} color="#FFFFFF" />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#0872ce',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Home',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#0872ce" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);

const RouteStackScreen = ({navigation}) => (
    <RouteStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#0872ce',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <RouteStack.Screen name="Route" component={RouteDetails} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#0872ce" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </RouteStack.Navigator>
);


const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#0872ce',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name=" Order" component={DetailsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#0872ce" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </DetailsStack.Navigator>
);


const ReportStackScreen = ({navigation}) => (
    <ReportStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#0872ce',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ReportStack.Screen name="Summary" component={ReportScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#0872ce" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </ReportStack.Navigator>
);

const ExploreStackScreen = ({navigation}) => (
    <ExploreStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#0872ce',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name="Shop" component={AllShops2} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#0872ce" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />

    </ExploreStack.Navigator>
);





