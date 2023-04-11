import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

import {reduxStore} from '../../../../../utils/redux';


const Subject = ({item}) => {
  const [backgroundColor, setBackgroundColor] = useState('#e1dcdc');
  const [stateDefault, setStateDefault] = useState(true);

  // manager subject status via redux
  reduxStore.subscribe(() => {
    setStateDefault(false); 
    reduxStore.getState() === 'ProfileTopSubject' ? setBackgroundColor('#e1dcdc'): setBackgroundColor(preValue => preValue);
  });
  const subjectSelect = () => {
    // set backgroud for selected subject
    reduxStore.dispatch({ type: 'ProfileTopSubject' });
    setBackgroundColor('#b0b0b0');

    // move view for user
    reduxStore.dispatch({ type: `ProfileBottomSubject${item}` });
  };

  useEffect(() => {
    // init background, Post is selected first
    if(item==='Post' && stateDefault) {
      setBackgroundColor('#b0b0b0');
    }
    return(() => {
      setBackgroundColor();
      setStateDefault();
    });
  },[]);

  return (
    <View style={{backgroundColor: backgroundColor, margin: 2, borderRadius: 20}}>
      <Pressable onPress={() => subjectSelect()} style={styles.subject}>
        <Text style={styles.subjectText}>{item}</Text>
      </Pressable>
    </View>
  );
};

export default Subject;