import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    page: {

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    dialog: {
        backgroundColor: 'red',
        width: '100%', 
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});

export default styles;