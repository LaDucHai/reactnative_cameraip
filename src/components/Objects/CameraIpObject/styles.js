import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    image: {
        height: 300,
        width: '100%'
    }
});

export default styles;