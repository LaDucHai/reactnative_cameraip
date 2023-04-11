import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    page: {
        // justifyContent: "center",
        // alignItems: 'center'
    },
    videoContainer: {
        width: '100%',
        height: '100%'
    },
    videoBox: {
        height: '100%',
        width: '100%'
    },
    video: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    }, 
    controllContainer: {
        position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    controllTTop: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    timestamp: {
        backgroundColor: '#b8b8b8',
        borderRadius: 10
    },
    timestampText: {
        margin: 5,
        color: 'white'
    },
    selectContainer: {
        backgroundColor: '#b8b8b8',
        borderRadius: 10
    },
    selects: {
        flexDirection: 'row',
    },
    select: {
        margin: 2
    },
    fullScreenIcon: {
        margin: 2
    },
    paused: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    paused1: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    paused2: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    time10s0: {
        width: 100,
        height: 70,
        alignItems: 'center'
    },  
    time10s1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    time10sText: {
        color: 'white'
    },
    thumbnailPreviews: {
        position: 'absolute',
        alignItems: 'center',
        width: 80,
        height: 120,
        bottom: 40
    },
    thumbnail: {
        width: '100%',
        height: '100%'
    },
    thumbnailText: {
        color: 'white'
    },
    controlls: {
        width: '100%'
    },
    progressBarContainer: {
        alignItems: 'flex-end',
        height: 10,
        width: '100%',
        flexDirection: 'row',
        backfaceVisibility: 'visible'
    },
    progressBarContainer1: {
        alignItems: 'center',
        height: 0,
        width: '100%',
        flexDirection: 'row'
    }
});

export default styles;