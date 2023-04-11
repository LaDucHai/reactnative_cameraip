import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {
        height: Dimensions.get('window').height
    },
    animated: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        backgroundColor: 'blue'
    }
});

export default styles;