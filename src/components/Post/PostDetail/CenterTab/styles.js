import {StyleSheet, Dimensions} from 'react-native';
import {borderBottomColorCode} from '../../../constant/index.js'

const win = Dimensions.get('window');
const ratio = win.width / 200;

const styles = StyleSheet.create({
    page: {
        marginTop: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColorCode
    }, 
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    time: {
        fontSize: 10
    },
    content: {
        fontSize: 15,
        margin: 5
    },
    image: {
        height: 300 * ratio,
        width: win.width
    },
    video: {
        height: 300 * ratio,
        width: win.width
    }
});

export default styles;