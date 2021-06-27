
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Picker, TextInput, Button, TouchableOpacity,SafeAreaView,ScrollView,Platform,Image} from "react-native";
import axios from "axios";
import {Users, UserContext, cart} from '../Context/context';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const ReturnDetails = (props) =>{
    const locate = useContext(UserContext);


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {


        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();


    }, []);






    async function takeAndUploadPhotoAsync() {
        // Display the camera to the user and wait for them to take a photo or to cancel
        // the action
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('avatar', { uri: localUri, name: filename, type });

        return await fetch('http://104.236.38.247:8000/api/onlyimage', {
            method: 'PUT',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    }










    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 4],
    //         quality: 1,
    //     });
    //
    //     console.log(result);
    //     setImage(result.uri);
    //
    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };

    const submit = ()=> {

        console.log('yyyyyyyyyyyyyyyyyy');
        axios.post('http://104.236.38.247:8000/api/onlyimage',{

        })
            .then((res)=>{
                console.log(res.data);

            })
            .catch((err)=>{
                console.log(err);
            })
    }



    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Pick an image from camera roll" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>



                    <Button
                        title="Submit"
                        onPress={() => {
                            takeAndUploadPhotoAsync();
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>

    );

}

export default ReturnDetails;

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "skyblue",
        margin: 20,
        marginTop: 20,
    },
    container: {
        margin: 20,
        marginTop: 100,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

