import React, {useState, useEffect, memo} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

import {createThumbnail} from "react-native-create-thumbnail";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/core';



const ImageVideoContainer = ({index, item, onText, onDelete}) => {
    const [thumbnail, setThumbnail] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        if(item.type==='video/mp4') {
            createThumbnail({
                url: item.uri,
                timeStamp : (item.duration/2)*1000,
            }).then(response => {
                setThumbnail(response.path);
            }).catch(err => console.log({ err }));
        }
    },[]);


    const convert_duration = (duration) => {
        return `${Math.floor(duration/60)}:${duration%60}`;
    };

    const handlePlay = () => {
        navigation.navigate('ImageVideoDetail', {
            item: item 
        });
    };

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <View style={styles.page}>
            <TextInput 
                placeholder={`Please write something for your ${item.type}`}
                onChangeText={(value) => onText(index, value)}
            />
            {
                item.type==='video/mp4'?
                <View style={styles.videoContainer}>
                    <View style={styles.videoThumbnail}>
                        <Image
                            source={{uri : thumbnail}}
                            style={styles.image}
                        />
                        <View style={styles.durationContainer}>
                            <View style={styles.durationBox1}>
                                <Text style={styles.durationText}>{convert_duration(item.duration)}</Text>
                            </View>
                        </View>
                        <View style={styles.playContainer}>
                            <View style={styles.playBox1}>
                                <EvilIcons style={styles.playIcon} name='play' size={50} color={'white'} onPress={() => handlePlay()}/>
                            </View>
                        </View>
                    </View>
                </View>:
                <TouchableOpacity style={styles.imageContainer} onPress={() => handlePlay()}>
                    <Image
                        source={{uri : item.uri}}
                        style={styles.image}
                    />
                </TouchableOpacity>
            }
            <View style={styles.deleteContainer}>
                <TouchableOpacity style={styles.deleteBox0} onPress={() =>handleDelete()}>
                    <View style={styles.deleteBox1}>
                        <Text>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default memo(ImageVideoContainer);