import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    video: {
        width: '100%',
        height: '100%'
    }
});

export default styles;