import React, {useState, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';


const BottomLeftObject = ({item}) => {
    const moreOrHidden = useRef();
    const textMoreOrHidden = useRef('More');
    const [numberOfLines, setNumberOfLines] = useState(3);


    const MoreOrHidden = () => {
        const handleMoreOrHiddenPress = () => {
            switch (textMoreOrHidden.current) {
                case 'More':
                    textMoreOrHidden.current = 'Hidden';
                    setNumberOfLines(10);
                    break;
                case 'Hidden':
                    textMoreOrHidden.current = 'More';
                    setNumberOfLines(3);
                    break;
            };
        };
        return (
            moreOrHidden.current? 
            <Pressable onPress={() => handleMoreOrHiddenPress()}>
                <Text style={styles.moreText}>{textMoreOrHidden.current}</Text>
            </Pressable>:
            <View></View>
        );
    };

    const handleTextLayout = (e) => {
        const linesLength = e.nativeEvent.lines.length;
        if(linesLength>3) {
            moreOrHidden.current=true;
        } else {
            moreOrHidden.current=false;
        }
    }

    return (
        <View style={styles.page}>
            <Text 
                style={styles.contentText}
                ellipsizeMode='tail' 
                numberOfLines={numberOfLines} 
                onTextLayout={(e) => handleTextLayout(e)}
            >
                {item.Text}
            </Text>
            <MoreOrHidden />
        </View>
    );
};

export default BottomLeftObject;