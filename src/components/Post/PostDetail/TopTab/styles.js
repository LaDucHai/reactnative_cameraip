import {StyleSheet} from 'react-native';
import {borderBottomColorCode} from '../../../constant/index.js';

const styles = StyleSheet.create({
    page: {},
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColorCode
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        margin: 5,
    },
    username: {
        fontSize: 20
    },
    right: {
        margin: 5
    },
    center: {
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColorCode,
    },
    content: {
        fontSize: 18,
        marginBottom: 10,
    }, 
    bottom: {}
});

export default styles;