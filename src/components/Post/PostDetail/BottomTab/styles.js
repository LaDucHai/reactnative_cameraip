import {StyleSheet} from 'react-native';
import {borderBottomColorCode} from '../../../constant/index.js';

const styles = StyleSheet.create({
    page: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColorCode,
    },
    icon: {
        alignItems: 'center',
    }
});

export default styles;