import React, {useState, useEffect, memo} from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import styles from './styles';

import Post from '../../../Post';
import ImageCollection from '../Collection/ImageCollection';
import VideoCollection from '../Collection/VideoCollection';

import {reduxStore} from '../../../../utils/redux';



const CollectionView = ({item}) => {
    const [subject, setSubject] = useState('Image');

    useEffect(() => {
        return(() => {
            setSubject();
        });
    },[]);

    reduxStore.subscribe(() => {
        SelectView(reduxStore.getState())
    });

    const SelectView = (sub) => {
        switch(sub) {
            case 'ProfileBottomSubjectPost':
                setSubject('Post');
                break;
            case 'ProfileBottomSubjectImage':
                setSubject('Image');
                break;
            case 'ProfileBottomSubjectVideo':
                setSubject('Video');
                break;
            case 'ProfileBottomSubjectCamera':
                setSubject('Camera');
                break;
            case 'ProfileBottomSubjectInfo':
                setSubject('Infor');
                break;
            case 'ProfileBottomSubjectSetUp':
                setSubject('SetUp');
                break;
            default:
                break;
        };
    };

    const ViewSelect = ({item}) => {
        if(subject === 'Post') {
            return <Post />
        }
        if(subject === 'Image') {
            return <ImageCollection item={item}/>
        }
        if(subject === 'Video') {
            return <VideoCollection />
        }
    };

    return (
        <View style={styles.page}>
            {/* <ViewSelect item={item}/> */}
            <FlatList
                data={['Post', 'Image', 'Video']}
                keyExtractor={(item, index) => String(index)}
                horizontal={true}
                snapToInterval={Dimensions.get('window').width}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                renderItem={({item, index}) =>(
                    <View key={index}>
                        <ViewSelect item={item}/>
                    </View>
                )}
            />
        </View>
    );
};

export default memo(CollectionView);