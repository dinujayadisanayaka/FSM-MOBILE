import React, {useCallback, useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {Users,UserContext} from '../Context/context';
import {cart, CartContext} from '../Context/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationActions as navigation} from "react-navigation";
import login from "./login";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

//import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    // const paperTheme = useTheme();
        const loginUserId=useContext(UserContext);
    // const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 33 }}>
                            <Avatar.Image

                                source={require('./icons/salesman.jpg')}

                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{Users.lguserfname} {Users.lguserlname}</Title>
                                <Caption style={styles.caption}>{Users.lguseremail}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <Ionicons name="ios-home" size={29} color="#000000" />
                            )}

                            label ="Home"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Home') }}

                        />

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <Ionicons name="ios-person" size={29} color="#000000" />

                            )}
                            label="Profile"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <Ionicons name="ios-car" size={29} color="#000000" />

                            )}
                            label="Routes"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Route') }}
                        />

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <MaterialIconsIcon name="store" size={30} color="#000000"></MaterialIconsIcon>

                            )}
                            label="Shop"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Explore') }}
                        />

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <Ionicons name="ios-cart" size={29} color="#000000" />

                            )}
                            label="Order"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Explore') }}
                        />

                        <DrawerItem
                            style={styles.between}
                            icon={({ color, size }) => (
                                <Ionicons name="ios-create" size={29} color="#000000" />

                            )}
                            label="Summary"
                            labelStyle={styles.tobold}
                            onPress={() => { props.navigation.navigate('Report') }}
                        />





                    </Drawer.Section>





                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="ios-exit" size={29} color="#000000" />

                            )}
                            label="Logout"
                            labelStyle={styles.tobold}
                            onPress={() => {props.navigation.navigate('login');
                                console.log('beforeid#'+ Users.loginuserid + 'beforeid2#'+cart.loginuserid2);
                                Users.loginuserid=null;
                                Users.lguserlname=null;
                                Users.lguserfname=null;
                                Users.unpshopid=null;
                                Users.moreshopid=null;
                                Users.lguseremail=null;
                                cart.loginuserid2=null
                                cart.shopidfo=null;
                                console.log('afterid#'+Users.loginuserid+ 'afterid2#'+cart.loginuserid2);}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#1589cb',
        marginTop:-5
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,

    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
        // color:'#98AFC7',

    },
    bottomDrawerSection: {
        marginBottom: 35,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        marginTop:195,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    fon: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },

    tobold: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
    },
    between: {
        marginTop:15
    },
});
