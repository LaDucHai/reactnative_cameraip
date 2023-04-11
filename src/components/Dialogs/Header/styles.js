import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'red',
        height: Dimensions.get('window').height/24
    }
});

export default styles;