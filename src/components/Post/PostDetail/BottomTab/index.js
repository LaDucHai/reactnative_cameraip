import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {inComment} from '../../../Redux/CommentRedux';



const BottomTab = () => {
    const [likeState, setLikeState] = useState(false);
    const [amountOfLike, setAmountOfLike] = useState(1);
    const [commentState, setCommetState] = useState(false);
    const [amountOfComment, setAmountOfComment] = useState(1);
    const [shareState, setShareState] = useState(false);
    const [amountOfShare, setAmountOfShare] = useState(1);

    const likeColor = () => {return(likeState === true ? 'red' : 'white')};

    const likePress = () => {
        setLikeState(currentValue => !currentValue);
        if(likeState) {
            setAmountOfLike(currentValue => currentValue - 1);
        } else {
            setAmountOfLike(currentValue => currentValue + 1);
        }
    };

    const commentPress = () => {
        inComment.dispatch({ type: 'inComment' });
    };

    return (
        <View style={styles.page}>
            <Pressable onPress={() => likePress()}>
                <View style={styles.icon}>
                    <AntDesign name='hearto' size={25} color={likeColor()}/>
                    <Text>{amountOfLike}</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => commentPress()}>
                <View style={styles.icon}>
                    <FontAwesome name='comment-o' size={25} />
                    <Text>{amountOfComment}</Text>
                </View>
            </Pressable>
            <Pressable>
                <View style={styles.icon}>
                    <Fontisto name='email' size={25} />
                    <Text>{shareState}</Text>
                </View>
            </Pressable>
            <Pressable>
                <View style={styles.icon}>
                    <AntDesign name='wechat' size={25} />
                    <Text>{shareState}</Text>
                </View>
            </Pressable>
            <Pressable>
                <View style={styles.icon}>
                    <AntDesign name='sharealt' size={25} />
                    <Text>{shareState}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default BottomTab;