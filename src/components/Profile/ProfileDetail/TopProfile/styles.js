import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {
        height: Dimensions.get('window').height/2,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'yellow'
    }
});

export default styles;