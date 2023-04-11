import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {},
    image: {
        height:  Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});

export default styles;