import React from 'react';
import {View} from 'react-native';

import Post from '../../components/Post';
import CommentDialog from '../../components/Dialogs/CommentDialog';



const Home = () => {
  return (
    <View>
      <Post />
      <CommentDialog />
    </View>
  );
};

export default Home;