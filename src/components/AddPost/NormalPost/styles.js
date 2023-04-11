import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    page: {
        height: '100%'
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 10
    },
    postPress: {
        backgroundColor: 'blue',
        margin: 10,
        height: 40,
        borderRadius: 40, 
        alignItems: 'center'
    },
    postPress1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    postText: {
        color: 'white'
    }, 
    progressContainer: {
        position: 'absolute',
        backgroundColor: '#fffefe',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        bottom: 0,
        alignItems: 'center'
    },
    progress1: {
        alignItems: 'center', 
        height: '100%', 
        flexDirection: 'row'
    },
    progress2: {
        alignItems: 'center', 
        justifyContent: 'space-around', 
        height: '100%'
    },
    progressCancel: {
        backgroundColor: '#ebebeb',
        padding: 15,
        borderRadius: 10
    }
});

export default styles;