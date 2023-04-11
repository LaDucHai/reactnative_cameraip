import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SERVERIP} from '../constant';
import PostOverview from './PostOverview';



const renderItem = ({item, index}) => {
  return <View ><PostOverview key={index} item={item}/></View>
};

const arr = ['Post123', 'Post456', 'Post789'];

const Post = () => {
  const [data, setData] = useState([]);
  const [pageCurrent, setPageCurrent]= useState(0);

  useEffect(() => {
    fetchData();
    return(() => {});
  },[pageCurrent]);
  
  const fetchData = () => {
    AsyncStorage.getItem('tokenLogin').then(token => {
      axios.get(`${SERVERIP}/getPost/${arr[pageCurrent]}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
      }).then(function (res) {
          setData(currentValue => [...currentValue, res.data]); 
      }).catch(function (error) {
          console.error(error);
      }).then(function () {
        // always executed
      });  
    }); 
  };
 
  const handleOnEndReached = () => {
    setPageCurrent(pageCurrent => pageCurrent + 1);
  };


  return (
    <View style={styles.page}>
      <FlatList 
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Post;