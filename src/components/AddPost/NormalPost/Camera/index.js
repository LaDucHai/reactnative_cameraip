import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

import {useRoute} from '@react-navigation/core';
import {RNCamera} from 'react-native-camera';
import Canvas from 'react-native-canvas';
import Video from 'react-native-video';



const Camera = () => {
    const route = useRoute();
    const item = route?.params?.item;

    const camera = useRef(null);
    const [img, setImg] = useState(null);

    const handleCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'purple';
        ctx.fillRect(0, 0, 100, 100);
    }
    
    const takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
        setImg(data.uri)
    };

    return (
        <View style={styles.page}>
            <RNCamera
                ref={camera}
                style={{width: '100%', height: '50%'}}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                // onFacesDetected={({faces}) => console.log(faces)}
                onFaceDetectionError={(isOperational) => console.log(isOperational)}
                faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    // console.log(barcodes);
                }}
            >
                {({ camera, status, recordAudioPermissionStatus }) => {
                    console.log('recordAudioPermissionStatus', recordAudioPermissionStatus);
                if (status !== 'READY') return <View></View>;
                    return (
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={{backgroundColor: 'red'}}>
                                <Text style={{ fontSize: 14 }}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                {/* <Canvas ref={(canvas) => handleCanvas(canvas)}/> */}
            </RNCamera>
            
            <Image
                source={{uri: img}}
                style={{width: '100%', height: '50%'}}
            />
        </View>
    );
};

export default Camera;