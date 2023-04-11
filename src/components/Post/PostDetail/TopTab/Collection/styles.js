import {StyleSheet, Dimensions} from 'react-native';

const win = Dimensions.get('window');
const ratio = win.width / 200;

const styles = StyleSheet.create({
    page: {
        height: 500
    },
    backGroundImage: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    backGroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;