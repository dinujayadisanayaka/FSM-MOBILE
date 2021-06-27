
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView, Platform, Image } from "react-native";
import axios from "axios";
import { Users, UserContext, cart } from '../Context/context';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const ReturnDetails = (props) =>{
  const locate = useContext(UserContext);

  const navigation = useNavigation();


  const[shopname,setShopname] = useState('');
  const[ownername,setOwnername] = useState('');
  const[ownernic,setOwnernic] = useState('');
  const[address,setAddress] = useState('');
  const[suburb,setSuburb] = useState('');
  const[city,setCity] = useState('');
  const[district,setDistrict] = useState('');
  const[telephone,setTelephone] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [image, setImage] = useState(null);


  useEffect(() => {


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();



    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();



  }, []);




  let latlng = '';
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    latlng = (location);
    console.log(text);
    console.log('current Lat****** '+latlng.coords.latitude);
    console.log('current Lat******'+latlng.coords.longitude);

  }

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!shopname.trim()) {
      alert('Shop name is required');
      return;
    }
    //Check for the Email TextInput
    if (!ownername.trim()) {
      alert('Owner name is required');
      return;
    }
    if (ownernic.length  == 10 || ownernic.length  == 12) {

    }
    else{
      alert('NIC is invalid. NIC should contain 10 unique digits or 12 digits.');
      return;
    }
    if (telephone.length  != 10) {
      alert('Telephone number is invalid.');

      return;
    }
    //Checked Successfully
    //Do whatever you want
    pickImage();
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);
    setImage(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const formData = new FormData();
    formData.append("avatar", {type: 'image/jpg', uri:result.uri, name:'uploaded.jpg'});
    formData.append("shop_name", shopname);
    formData.append("owner_name", ownername);
    formData.append("owner_NIC", ownernic);
    formData.append("address_no", address);
    formData.append("suburb", suburb);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("telephone_numbers", telephone);
    formData.append("user_id", locate.loginuserid);
    formData.append("lat", latlng.coords.latitude);
    formData.append("lng", latlng.coords.longitude);
    formData.append("RouteID",  locate.currouteid);
    // formData.append("lat",78.9);
    // formData.append("lng", 78.5);
    // formData.append("RouteID",  2);
    const heads =
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
    axios
        .post(
            "http://104.236.38.247:8000/api/mobileshopaddwi",
            formData,
            heads
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });




  };

  const submit = ()=> {
    setShopname('')
    setOwnername('');
    setOwnernic('');
    setAddress(''),
    setSuburb('');
    setCity('');
    setDistrict('');
    setTelephone('');
    setLocation(null);
    setErrorMsg(null);
    setImage(null);
    props.navigation.navigate('Explore');

  }



  return(
      <SafeAreaView style={styles.container}>

        <View style={styles.rect}>
          <View style={styles.iconRow}>
            <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
            <Text style={styles.cart}>Shop</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View>

              <Text
                  style={{
                    color: 'blue',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: 10
                  }}>
                Add shop
              </Text>
            </View>
            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter Shop Name"
                value={shopname}
                onChangeText={(val) => setShopname(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter Owner Name"
                value={ownername}
                onChangeText={(val) => setOwnername(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter NIC"
                value={ownernic}
                onChangeText={(val) => setOwnernic(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter Address No"
                value={address}
                onChangeText={(val) => setAddress(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter Suburb"
                value={suburb}
                onChangeText={(val) => setSuburb(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter City"
                value={city}
                onChangeText={(val) => setCity(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter district"
                value={district}
                onChangeText={(val) => setDistrict(val)}
            />
            </View>

            <View style={styles.formRow}>
            <TextInput
                style={styles.input}
                placeholder="Enter TP"
                keyboardType={'numeric'}
                value={telephone}
                onChangeText={(val) => setTelephone(val)}
            />
            </View>


            {/*<Button*/}
            {/*    title="Submit"*/}
            {/*    onPress={checkTextInput}*/}

            {/*    color="#606070"*/}
            {/*/>*/}

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image" onPress={checkTextInput} />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    submit();

                  }}
              >
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Submit</Text>
              </TouchableOpacity>
            </View>




          </View>
        </ScrollView>

        <View style={styles.productCartOverallViewB}>
          <View style={styles.productCartInlineViewB}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Home')}>
              <Ionicons name="ios-home" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.productCartInlineViewB}>
            <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate('Explore', { title: 'Explore' })

                }>
              <MaterialIconsIcon name="store" size={26} color="#FFFFFF"></MaterialIconsIcon>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>

  );

}

export default ReturnDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {

    marginHorizontal: 1,
  },
  // formRow: {
  //   marginBottom: 10,
  //   marginLeft: 13,
  //   justifyContent: 'center',
  //   borderColor: "#000000"
  // },
  // empty: {
  //   textAlign: 'center',
  //   color: '#808080',
  // },
  //
  // addProductBtn: {
  //   backgroundColor: 'blue',
  //   paddingVertical: 10,
  // },

  addProductText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  formRow: {
    marginTop:5,
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#add8e6',
    height: 40,
    paddingHorizontal: 10,
    color: '#000000',
    borderRadius: 10,
    width:380,
    marginLeft:16,

  },
  empty: {
    textAlign: 'center',
  },

  addProductBtn: {
    backgroundColor: 'blue',
    paddingVertical: 10,
  },

  // addProductText: {
  //   textAlign: 'center',
  //   color: '#fff',
  //   fontSize: 15,
  //   fontWeight: 'bold',
  // },

  // container:{
  //     height:"100%",
  //     alignItems:"center",
  //     justifyContent:"center"
  // }

  formWrapper: {
    width: '80%',
    justifyContent: 'center',
  },

  // formRow: {
  //   marginBottom: 10,
  // },

  textInput: {
    backgroundColor: '#add',
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
    borderRadius: 20,
  },

  welcomeText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B547E',
  },
  regText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',

  },
  // productCartInlineViewB: {
  //
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   width: 100,
  //   height: 25,
  //
  //   // borderRadius: 60,
  //   textAlign: 'center',
  //   marginRight: 10,
  //   marginLeft: 70,
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  productCartOverallViewB: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#0872ce'
  },
  rect: {
    width: 415,
    height: 62,
    backgroundColor: '#0872ce',
    flexDirection: "row",
    marginTop: -6
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    height: 44,
    width: 40
  },
  cart: {
    fontWeight: 'bold',
    color: "rgba(245,245,245,1)",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 4
  },
  iconRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 280,
    marginLeft: 8,
    marginTop: 13
  },
  productCartInlineViewB: {

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 25,
    textAlign: 'center',
    // marginRight: 10,
    marginLeft: 70,
    marginTop: 15,
    marginBottom: 10,
  },
  // productCartOverallViewB: {
  //   flexDirection: 'row',
  //   width: '100%',
  //   alignSelf: 'center',
  //
  //
  //   backgroundColor: 'rgba(11,1,47,1)'
  // },
  button: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#0799f8",
    padding: 10,
    borderRadius: 15,
    width: '50%',

  },
});;














































//
//
//
//
//
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   Button,
//   RadioButtonGroup,
//   RadioButton,
//   SafeAreaView, ScrollView,
//   Text
// } from "react-native";
// import {Users,UserContext} from '../Context/context';
//
// import axios from "axios";
//
//
// const initialState = {
//   shop_name: "",
//   owner_name: "",
//   owner_NIC: "",
//   address_no: "",
//   suburb: "",
//   city: "",
//   district: "",
//   telephone_numbers: "",
//   user_id: "",
// }
//
//
// class ReturnDetails extends React.Component {
//   constructor() {
//     super();
//     this.state = initialState;
//   }
//
//
//   submit() {
//     axios.post("http://104.236.38.247:8000/api/mobileshopadd", {
//       shop_name: this.state.shop_name,
//       owner_name: this.state.owner_name,
//       owner_NIC: this.state.owner_NIC,
//       address_no: this.state.address_no,
//       suburb: this.state.suburb,
//       city: this.state.city,
//       district: this.state.district,
//       telephone_numbers: this.state.telephone_numbers,
//       user_id: this.context.loginuserid,
//     })
//         .then((res) => {
//           console.log(res.data)
//           this.setState(initialState)
//           this.props.navigation.navigate('Explore')
//         })
//         .catch((error) => console.log(error));
//
//
//   }
//
//   updateValue(text, field) {
//     if (field == "shop_name") {
//       this.setState({
//         shop_name: text,
//       });
//     } else if (field == "owner_name") {
//       this.setState({
//         owner_name: text,
//       });
//     } else if (field == "owner_NIC") {
//       this.setState({
//         owner_NIC: text,
//       });
//     } else if (field == "address_no") {
//       this.setState({
//         address_no: text,
//       });
//     } else if (field == "suburb") {
//       this.setState({
//         suburb: text,
//       });
//     } else if (field == "city") {
//       this.setState({
//         city: text,
//       });
//     } else if (field == "district") {
//       this.setState({
//         district: text,
//       });
//     } else if (field == "telephone_numbers") {
//       this.setState({
//         telephone_numbers: text,
//       });
//     } else if (field == "user_id") {
//       this.setState({
//         user_id: text,
//       });
//     }
//   }
//
//   render() {
//     return (
//         <SafeAreaView style={styles.container}>
//           <ScrollView style={styles.scrollView}>
//         <View style={styles.container}>
//           <TextInput
//               style={styles.input}
//               placeholder="Enter Shop Name"
//               value={this.state.shop_name}
//               onChangeText={(text) => this.updateValue(text, "shop_name")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter Owner Name"
//               value={this.state.owner_name}
//               onChangeText={(text) => this.updateValue(text, "owner_name")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter NIC"
//               value={this.state.owner_NIC}
//               onChangeText={(text) => this.updateValue(text, "owner_NIC")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter Address No"
//               value={this.state.address_no}
//               onChangeText={(text) => this.updateValue(text, "address_no")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter Suburb"
//               value={this.state.suburb}
//               onChangeText={(text) => this.updateValue(text, "suburb")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter City"
//               value={this.state.city}
//               onChangeText={(text) => this.updateValue(text, "city")}
//           />
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter district"
//               value={this.state.district}
//               onChangeText={(text) => this.updateValue(text, "district")}
//           />
//
//
//           <TextInput
//               style={styles.input}
//               placeholder="Enter TP"
//               value={this.state.telephone_numbers}
//               onChangeText={(text) => this.updateValue(text, "telephone_numbers")}
//           />
//
//
//
//           <Button
//               title="Submit"
//               onPress={() => {
//                 this.submit();
//               }}
//           />
//         </View>
//           </ScrollView>
//         </SafeAreaView>
//     );
//   }
// }
// ReturnDetails.contextType = UserContext;
// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 2,
//     borderColor: "skyblue",
//     margin: 20,
//     marginTop: 20,
//   },
//   container: {
//     margin: 20,
//     marginTop: 100,
//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     marginHorizontal: 20,
//   },
//   text: {
//     fontSize: 42,
//   },
// });
//
// export default ReturnDetails;




// image test with old province



//
//
// import React, { useState } from "react";
// import * as ImagePicker from 'expo-image-picker';
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   Button,
//   RadioButtonGroup,
//   RadioButton,
//   SafeAreaView, ScrollView,
//   Text,
//   Platform
// } from "react-native";
//
// import axios from "axios";
//
// class ReturnDetails extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       shop_name: "",
//       owner_name: "",
//       owner_NIC: "",
//       address_no: "",
//       suburb: "",
//       city: "",
//       province: "",
//       country: "",
//       telephone_numbers: "",
//       user_id: "",
//       image: null,
//     };
//   }
//
//
//
//
//
//
//
//   componentDidMount() {
//     this.getPermissionAsync();
//     console.log('hi');
//   }
//
//   getPermissionAsync = async () => {
//     if (Constants.platform.ios) {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   }
//
//   _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1
//     });
//
//     console.log(result);
//
//     if (!result.cancelled) {
//       this.setState({image: result.uri});
//     }
//   }
//
//
//
//
//
//   refresh = () => {
//     this.setState(this.state);
//   };
//
//   submit() {
//     axios.post("http://104.236.38.247:8000/api/mobileshopaddwi", {
//       shop_name: this.state.shop_name,
//       owner_name: this.state.owner_name,
//       owner_NIC: this.state.owner_NIC,
//       address_no: this.state.address_no,
//       suburb: this.state.suburb,
//       city: this.state.city,
//       province: this.state.province,
//       country: this.state.country,
//       telephone_numbers: this.state.telephone_numbers,
//       user_id: this.state.user_id,
//       avatar:this.state.image,
//
//     })
//
//         .then((res) => console.log(res.data))
//         .catch((error) => console.log(error));
//
//
//     this.setState(this.state);
//
//   }
//
//   updateValue(text, field) {
//     if (field == "shop_name") {
//       this.setState({
//         shop_name: text,
//       });
//     } else if (field == "owner_name") {
//       this.setState({
//         owner_name: text,
//       });
//     } else if (field == "owner_NIC") {
//       this.setState({
//         owner_NIC: text,
//       });
//     } else if (field == "address_no") {
//       this.setState({
//         address_no: text,
//       });
//     } else if (field == "suburb") {
//       this.setState({
//         suburb: text,
//       });
//     } else if (field == "city") {
//       this.setState({
//         city: text,
//       });
//     } else if (field == "province") {
//       this.setState({
//         province: text,
//       });
//     } else if (field == "country") {
//       this.setState({
//         country: text,
//       });
//     } else if (field == "telephone_numbers") {
//       this.setState({
//         telephone_numbers: text,
//       });
//     } else if (field == "user_id") {
//       this.setState({
//         user_id: text,
//       });
//     }
//   }
//
//
//
//
//   render() {
//     let { image } = this.state;
//     return (
//
//         <SafeAreaView style={styles.container}>
//           <ScrollView style={styles.scrollView}>
//             <View style={styles.container}>
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Shop Name"
//                   onChangeText={(text) => this.updateValue(text, "shop_name")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Owner Name"
//                   onChangeText={(text) => this.updateValue(text, "owner_name")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter NIC"
//                   onChangeText={(text) => this.updateValue(text, "owner_NIC")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Address No"
//                   onChangeText={(text) => this.updateValue(text, "address_no")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Suburb"
//                   onChangeText={(text) => this.updateValue(text, "suburb")}
//               />
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter City"
//                   onChangeText={(text) => this.updateValue(text, "city")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Province"
//                   onChangeText={(text) => this.updateValue(text, "province")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter Country"
//                   onChangeText={(text) => this.updateValue(text, "country")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter TP"
//                   onChangeText={(text) => this.updateValue(text, "telephone_numbers")}
//               />
//
//               <TextInput
//                   style={styles.input}
//                   placeholder="Enter User ID"
//                   onChangeText={(text) => this.updateValue(text, "user_id")}
//               />
//
//
//               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Button
//                     title="Pick an image from camera roll"
//                     onPress={this._pickImage}
//                 />
//                 {this.image &&
//                 <Image source={{ uri: this.image }} style={{ width: 200, height: 200 }} />}
//               </View>
//
//
//               <Button
//                   title="Submit"
//                   onPress={() => {
//                     this.submit();
//                   }}
//               />
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 2,
//     borderColor: "skyblue",
//     margin: 20,
//     marginTop: 20,
//   },
//   container: {
//     margin: 20,
//     marginTop: 100,
//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     marginHorizontal: 20,
//   },
//   text: {
//     fontSize: 42,
//   },
// });
//
// export default ReturnDetails;
