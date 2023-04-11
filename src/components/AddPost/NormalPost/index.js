import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RNRestart from 'react-native-restart';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/core';

import {SERVERIP} from '../../constant';

import ImageVideoContainer from './ImageVideoContainer';



const NormalPost = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const finalData = useRef([]);
    const [render, setRender] = useState(true);
    const token = useRef(null);

    const [progress, setProgress] = useState(0); 
    const [indeterminate, setIndeterminate] = useState(false);
    const progressHeight = useRef(new Animated.Value(0)).current;
    const uploading = useRef(false);

    const postText = useRef('');
    const textArr = useRef([]);

    useEffect(() => {
        AsyncStorage.getItem('tokenLogin').then(value => {
            token.current = value;
        }); 
    }, []);

    const handlePicker = () => {
        launchImageLibrary({
            selectionLimit: 0,
            mediaType: 'mixed'
        }, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log('ImagePicker Error: ', res.errorCode);
            } else if (res.errorMessage) {
                console.log('Description of the error: ', res.errorMessage);
            } else {
                let arr = [];
                let arr1 = [];
                for (let i = 0; i < res.assets.length; i++) {
                    arr.push(res.assets[i]);
                    arr1.push('');
                }
                setData(preValue => preValue.concat(arr));
                textArr.current = textArr.current.concat(arr1);
            }
        })
    };

    const handleCamera = () => {
        // launchCamera({
        //     cameraType: 'front',
        //     saveToPhotos: true
        // }, (res) => {
        //     if (res.didCancel) {
        //         console.log('User cancelled camera picker');
        //     } else if (res.errorCode) {
        //         console.log('Camera Error: ', res.errorCode, res.errorMessage);
        //     } else if (res.errorMessage) {
        //         console.log('Description of the error: ', res.errorMessage);
        //     } else {
        //         let arr = [];
        //         let arr1 = [];
        //         for (let i = 0; i < res.assets.length; i++) {
        //             arr.push(res.assets[i]);
        //             arr1.push('');
        //         }
        //         setData(preValue => preValue.concat(arr));
        //         textArr.current = textArr.current.concat(arr1);
        //     }
        // })
        navigation.navigate('Camera', {
            item: 1
        });
    };

    const handDelete = (index) => {
        setData(preValue => {
            preValue.splice(index, 1);
            return preValue;
        });
        setRender(!render);
    };

    const handleNormalPost = () => {
        axios.post(`${SERVERIP}/normalPost`, {
            headers: {
                Authorization: `Bearer ${token.current}`,
                'Content-Type': 'multipart/form-data'
            }, 
            data: {
                text: postText.current,
                imageVideoArr: finalData.current
            }
            // data: finalData.current
        }).then(function (res) {
            if(res.data.message==='success!') {
                const myTimeout = setTimeout(() => {
                    Animated.timing(progressHeight, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false
                    }).start();
                    finalData.current = [];
                    uploading.current = false;
                    RNRestart.Restart();
                    clearTimeout(myTimeout);
                }, 300); 
            }
        }).catch(function (error) {
              console.error(error);
        }).then(function () {
            // always executed
        });  
    };

    const handleUpload = () => {
        const filename = (data) => {
            if(data.type==='video/mp4') {
                return `${Math.floor(Math.random()*10000)}.mp4`;
            } else if((data.type==='image/jpeg')||(data.type==='image/png')||(data.type==='image/jpg')) {
                return `${data.uri}`;
            } else {
                return;
            }
        };
        if((data.length>0)&&(!uploading.current)) {
            uploading.current = true;
            const arr = [];
            for(let i = 0; i < data.length; i++) {
                arr.push({name: 'photo', filename: filename(data[i]), type: `${data[i].type}`, data: RNFetchBlob.wrap(data[i].uri)})
            }

            RNFetchBlob.fetch('POST', `${SERVERIP}/upload`, {
                Authorization : `Bearer ${token.current}`,
                'Content-Type': 'multipart/form-data'
            }, arr).uploadProgress({ interval : 250 },(written, total) => {
                setProgress(written/total);

                Animated.timing(progressHeight, {
                    toValue: 300,
                    duration: 200,
                    useNativeDriver: false
                }).start();

            }).then((res) => {
                const resData = JSON.parse(res.data);
                if(resData.message==='success!') {
                    setProgress(1);
                    setIndeterminate(true);
                    if(resData.fileArr.length===data.length) {
                        let arr = [];
                        for(let i = 0; i < resData.fileArr.length; i++) {
                            arr.push({
                                text: textArr.current[i],
                                url: `${SERVERIP}/photo?id=${resData.id}&mimetype=${resData.fileArr[i].mimetype}&filename=${resData.fileArr[i].filename}`
                            });
                        }
                        finalData.current = finalData.current.concat(arr);
                        handleNormalPost();
                    }
                }
                console.log(resData)
            }).catch((error) => {
                console.error('error', error);
            });   
        }
    };

    const handleCancelUpload = () => {
        console.log('handleCancelUpload');
    };

    const handleText = (index, value) => {
        textArr.current.splice(index, 1, value);
    };

    return (
        <View style={styles.page}>
            <TextInput 
                placeholder='Please write something for your normal post'
                onChangeText={(value) => postText.current = value}
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={() => handlePicker()}>
                    <FontAwesome5 name='image' size={40} color={'blue'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => handleCamera()}>
                    <FontAwesome5 name='camera' size={40} color={'blue'}/>
                </TouchableOpacity>
            </View>       
            <TouchableOpacity style={styles.postPress} onPress={() => handleUpload()}>
                <View style={styles.postPress1}>
                    <Text style={styles.postText}>POST</Text>
                </View>
            </TouchableOpacity>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    data.map((item, index) => {
                        return (
                            <View key={index}>
                                <ImageVideoContainer index={index} item={item} onText={handleText} onDelete={handDelete}/>
                            </View>
                        )
                    })
                }
            </ScrollView>

            <Animated.View 
                style={[styles.progressContainer, {
                    height: progressHeight
                }]}
            >
                <View style={styles.progress1}>
                    <View style={styles.progress2}>
                        <Progress.Circle size={150} indeterminate={indeterminate} thickness={8} progress={progress} showsText={true}/>
                        <TouchableOpacity style={styles.progressCancel} onPress={() => handleCancelUpload()}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export default NormalPost;