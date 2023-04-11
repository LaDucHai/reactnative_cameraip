import {StyleSheet, Dimensions} from 'react-native';


const styles = StyleSheet.create({
    page: {},
    videoContainer: {
        
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2
    },
    durationContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%'
    },
    durationBox1: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: '100%'
    },
    durationText:{
        fontSize: 15,
        color: 'white',
        marginRight: 5
    },
    playContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    playBox1: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%'
    },
    playIcon: {
       
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2
    },
    imageContainer: {

    },
    deleteContainer: {
        alignItems: 'flex-end',
        margin: 5
    },
    deleteBox0: {
        backgroundColor: '#d7d6d6',
        alignItems: 'center',
        width: 70,
        height: 35,
        borderRadius: 10,
    },
    deleteBox1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    }
});

export default styles;