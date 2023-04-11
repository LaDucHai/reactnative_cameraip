import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Dimensions, Animated, PanResponder, Pressable, Image, BackHandler, TouchableOpacity} from 'react-native';
import styles from './styles';

import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createThumbnail} from "react-native-create-thumbnail";
import Orientation from 'react-native-orientation';



const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;

const PlayVideo = ({item}) => {
    const windowSize = useRef({
        height:  Dimensions.get('window').height,
        width: Dimensions.get('window').width
    })

    const orientationCurrent = useRef(null);
    const pageDimensions = useRef({
        height: Dimensions.get('window').height/3,
        width: Dimensions.get('window').width
    });
    const pageControllContainer = useRef({
        height: Dimensions.get('window').height/3,
        width: Dimensions.get('window').width,
        marginLeft: 0
    });
    const fullscreen = useRef(false);

    const [hiddenControls, setHiddenControls] = useState(false);

    const player = useRef(0);

    const [paused, setPaused] = useState(false);

    const videoDuration = useRef(0);
    const [currentTime, setCurrentTime] = useState(0);
    const getCurrentTime = useRef(0);
    const stopPos = useRef(0);

    const [img, setImg] = useState(null); 

    const thumbnailPreviewsArr = useRef([]);
    const [currentTimePreviews, setCurrentTimePreviews] = useState(0);
    const thumbnailMarginLeft = useRef(new Animated.Value(0)).current;
    const hiddenThumbnail = useRef(new Animated.Value(0)).current;

    const progressSize = useRef(new Animated.Value(2)).current;
    const dotSize = useRef(new Animated.Value(10)).current;
    const progressWidth = useRef(new Animated.Value(0)).current;
    const progressMaxWidth = useRef();
    const currentPos = useRef(0);

    const time10s = useRef(false);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // const moveXY = fullscreen.current? gestureState.moveY : gestureState.moveX;
                const moveXY = gestureState.moveX;
                progressWidth.setValue(moveXY);
                progressSize.setValue(5);
                dotSize.setValue(20);
            },
            onPanResponderMove: (evt, gestureState) => {
                // const moveXY = fullscreen.current? gestureState.moveY : gestureState.moveX;
                const moveXY = gestureState.moveX;
                progressWidth.setValue(moveXY-10);
                const progress = (moveXY/progressMaxWidth.current)*videoDuration.current;
                setCurrentTimePreviews(progress);
                const currentThumbnail = (progress - (progress%5))/5;
                if(Math.floor(progress%5)===0) {
                    setImg(thumbnailPreviewsArr.current[Math.floor(currentThumbnail)]);
                }
                if((moveXY>=40)&&(moveXY<=(progressMaxWidth.current-40))) {
                    thumbnailMarginLeft.setValue(moveXY-40);
                }
                hiddenThumbnail.setValue(1);
            },
            onPanResponderRelease: (evt, gestureState) => {
                // const moveXY = fullscreen.current? gestureState.moveY : gestureState.moveX;
                const moveXY = gestureState.moveX;
                const progress = (moveXY/progressMaxWidth.current)*videoDuration.current;
                AnimatedProgress(progressMaxWidth.current, videoDuration.current-progress);
                player?.current?.seek(progress);
                progressSize.setValue(2);
                dotSize.setValue(10);
                hiddenThumbnail.setValue(0);
            }
        })
    ).current;

    useEffect(() => {
        const initialOrientation = Orientation.getInitialOrientation();
        orientationCurrent.current = initialOrientation;
        progressMaxWidth.current = widthWindow;

        // update currentPos realtime
        progressWidth.addListener((value) => {
            currentPos.current = value.value;
        });

        Orientation.addOrientationListener((orientation) => orientationDidChange(orientation));

        // BackHandler on android
        BackHandler.addEventListener('hardwareBackPress', () => backAction());
        const backAction = () => {
            if(orientationCurrent.current === 'LANDSCAPE') {
                pageDimensions.current = {
                    height: Dimensions.get('window').width/3,
                    width: Dimensions.get('window').height
                }
                pageControllContainer.current = {
                    height: Dimensions.get('window').width/3,
                    width: Dimensions.get('window').height,
                    marginLeft: 0
                }
                Orientation.lockToPortrait();
                fullscreen.current = false;
                progressMaxWidth.current = heightWindow;
                return true;
            } else {
                return false;
            }
        };

        return() => {
            Orientation.getOrientation((err, orientation) => {
                if(err) console.error(err);
                // console.log(`Current Device Orientation: ${orientation}`);
            });
            // Remember to remove listener
            Orientation.removeOrientationListener((orientation) => orientationDidChange(orientation));
            BackHandler.removeEventListener('hardwareBackPress', () => backAction());
        }
    }, []);

    const orientationDidChange = (orientation) => {
        orientationCurrent.current = orientation;  
        if (orientationCurrent.current === 'PORTRAIT') {
            const progress = currentPos.current/windowSize.current.height;
            player?.current?.seek(progress*videoDuration.current);
            progressWidth.setValue(windowSize.current.width*progress);
            AnimatedProgress(windowSize.current.width, videoDuration.current - progress*videoDuration.current);
        } else if (orientationCurrent.current === 'LANDSCAPE') {
            const progress = currentPos.current/windowSize.current.width;
            player?.current?.seek(progress*videoDuration.current);
            progressWidth.setValue(windowSize.current.height*progress);
            AnimatedProgress(windowSize.current.height, videoDuration.current - progress*videoDuration.current);    
        }
    }

    const handleFullScreen = () => {
        if (orientationCurrent.current === 'PORTRAIT') {
            pageDimensions.current = {
                height: Dimensions.get('window').width,
                width: Dimensions.get('window').height
            }
            pageControllContainer.current = {
                height: Dimensions.get('window').width,
                width: Dimensions.get('window').height,
                marginLeft: 0
            }
            Orientation.lockToLandscape();
            fullscreen.current = true;
        } else if (orientationCurrent.current === 'LANDSCAPE') {
            pageDimensions.current = {
                height: Dimensions.get('window').width/3,
                width: Dimensions.get('window').height
            }
            pageControllContainer.current = {
                height: Dimensions.get('window').width/3,
                width: Dimensions.get('window').height,
                marginLeft: 0
            }
            Orientation.lockToPortrait();   
            fullscreen.current = false;
        }
        progressMaxWidth.current = heightWindow;
    };

    const convert_duration = (duration) => {
        const m = Math.floor(duration/60);
        const s = Math.round(duration%60);
        return `${m}:${s}`;
    };

    const handlePaused = () => { 
        if(paused) {
            const currentTime = (stopPos.current/progressMaxWidth.current)*videoDuration.current;
            progressWidth.setValue(stopPos.current);
            AnimatedProgress(progressMaxWidth.current, videoDuration.current - currentTime);
        } else {
            progressWidth.stopAnimation((value) => {
                stopPos.current = value;
            });
        }
        setPaused(!paused);
    };

    const handleEnd = () => {
        progressWidth.setValue(0);
        AnimatedProgress(progressMaxWidth.current, videoDuration.current);
    };

    const AnimatedProgress = (value, duration) => {
        Animated.timing(progressWidth, {
            toValue: value-10,
            duration: duration*1000,
            useNativeDriver: false
        }).start();
    };

    const handleLoad = (e) => {
        AnimatedProgress(progressMaxWidth.current, e.duration);
        videoDuration.current = e.duration;
        const int = (e.duration-(e.duration%5))/5;
        const arr = [];
        for(let i = 0; i < int + 1; i++) {
            createThumbnail({
                url: item.uri,
                timeStamp : 5*i*1000,
            }).then(response => {
                arr.push(response.path);
            }).catch(err => console.log({ err })); 
        }
        thumbnailPreviewsArr.current = arr;
    };

    const handleProgress = (e) => {
        if(hiddenControls) {
            setCurrentTime(e.currentTime);
        }
        getCurrentTime.current = e.currentTime;
    };

    const handleVideoContainerPress = () => {
        if(!hiddenControls) {
            setHiddenControls(true);
            let mySetTimeout = setTimeout(() => {
                if(!time10s.current) {
                    setHiddenControls(false);
                }
                clearTimeout(mySetTimeout);
            }, 5000)
        } else {
            setHiddenControls(false);
        }
    };

    const time10sTimeout = useRef(setTimeout(() => {},0));
    const handleTime10s = (type) => {
        clearTimeout(time10sTimeout.current);
        time10s.current = true;
        
        if(type==='banckward') {
            getCurrentTime.current = getCurrentTime.current - 10;
        } else if(type==='forward') {
            getCurrentTime.current = getCurrentTime.current + 10;
        }

        if (orientationCurrent.current === 'PORTRAIT') {
            player?.current?.seek(getCurrentTime.current);
            progressWidth.setValue((getCurrentTime.current/videoDuration.current)*windowSize.current.width);
            AnimatedProgress(windowSize.current.width, videoDuration.current - getCurrentTime.current);
        } else if (orientationCurrent.current === 'LANDSCAPE') {
            player?.current?.seek(getCurrentTime.current);
            progressWidth.setValue((getCurrentTime.current/videoDuration.current)*windowSize.current.height);
            AnimatedProgress(windowSize.current.height, videoDuration.current - getCurrentTime.current);    
        }

        time10sTimeout.current = setTimeout(() => {
            setHiddenControls(false);
            time10s.current = false;
            clearTimeout(time10sTimeout.current);
        }, 3000)
    };

    return (
        <View style={pageDimensions.current}>
            <View style={styles.videoContainer}>
                <Pressable style={styles.videoContainer} onPress={() => handleVideoContainerPress()}>
                    <Video
                        ref={player}
                        style={styles.video}
                        source={{uri: item.uri}} 
                        onError={(err) => console.error(err)}
                        paused={paused} 
                        repeat={true}
                        onLoad={(e) => handleLoad(e)}
                        onEnd={() => handleEnd()}
                        onProgress={(e) => handleProgress(e)}
                        fullscreen={fullscreen.current}
                    />
                </Pressable>
                <View style={[styles.controllContainer, pageControllContainer.current]}>
                    <View style={styles.controllTTop}>
                        <View style={styles.timestamp}>
                            {
                                hiddenControls?<Text style={styles.timestampText}>{convert_duration(currentTime)+'/'+convert_duration(videoDuration.current)}</Text>:<View></View>
                            }
                        </View>
                        <View style={styles.selectContainer}>
                            {
                                hiddenControls?
                                <View style={styles.selects}>
                                    <Ionicons style={[styles.select, styles.settings]} name='settings' size={25} color={'white'}/>
                                    <MaterialIcons onPress={() => handleFullScreen()} style={[styles.select, styles.fullScreenIcon]} name='fullscreen' size={25} color={'white'}/>
                                </View>
                                :<View></View>
                            }
                        </View>
                    </View>
                    <View style={styles.paused}>
                        <View style={styles.paused1}>
                            {
                                hiddenControls?
                                <View style={styles.paused2}>
                                    <TouchableOpacity style={styles.time10s0} onPress={() => handleTime10s('banckward')}>
                                        <View style={styles.time10s1}>
                                            <View>
                                                <AntDesign name='banckward' size={30} color={'white'}/>
                                                <Text style={styles.time10sText}>10 s</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <AntDesign name={paused?'playcircleo':'pausecircleo'} size={50} onPress={() => handlePaused()} color={'white'}/>
                                    <TouchableOpacity style={styles.time10s0} onPress={() => handleTime10s('forward')}>
                                        <View style={styles.time10s1}>
                                            <View>
                                                <AntDesign name='forward' size={30} color={'white'}/>
                                                <Text style={styles.time10sText}>10 s</Text> 
                                            </View>
                                        </View>   
                                    </TouchableOpacity>
                                </View>
                                :<View></View>
                            }
                        </View>
                        
                    </View>
                    <Animated.View 
                        style={[styles.thumbnailPreviews,
                            {
                                marginLeft: thumbnailMarginLeft,
                                opacity: hiddenThumbnail
                            }
                        ]}
                    >
                        <Image  
                            style={styles.thumbnail}
                            source={{uri: img}}
                        />
                        <Text style={styles.thumbnailText}>{convert_duration(currentTimePreviews)}</Text>
                    </Animated.View>
                    <View style={styles.controlls}>
                        <Animated.View 
                            style={styles.progressBarContainer}
                            {...panResponder.panHandlers}
                        >
                            <View style={styles.progressBarContainer1}>
                                <Animated.View
                                    style={{
                                        backgroundColor: 'blue',
                                        height: progressSize,
                                        width: progressWidth
                                    }}
                                />
                                <Animated.View 
                                    {...panResponder.panHandlers}                 
                                >
                                    <Animated.View
                                        style={{                                     
                                            backgroundColor: 'blue',
                                            height: dotSize,
                                            width: dotSize,
                                            borderRadius: dotSize
                                        }}
                                    />
                                </Animated.View>
                            </View>
                        </Animated.View>                   
                    </View>
                </View>
            </View>
        </View>
    )
};

export default PlayVideo;