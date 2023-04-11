import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    page: {

    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inDialog: {
        backgroundColor: 'red',
        width: '100%', 
        height: '50%',
        bottom: 0
    }
});

export default styles;