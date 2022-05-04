import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import images from './images.json';

function CardView({info}) {
  console.log('info :', info);
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{width: width, height: 500}}>
      <FlatList
        horizontal
        data={info.image}
        windowSize={5}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          console.log('item :', item);
          return (
            <View style={{width: width}}>
              <Image
                source={{uri: item}}
                style={{width: width, height: 200}}
                resizeMode={'cover'}
              />
            </View>
          );
        }}
      />
      <Text>{info.p}</Text>
    </View>
  );
}
const App = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/vivekverma1993/29379139e49f61c55d0e28a888ccaa0d/raw/6dbf62c815e1890919ddb3a904e202add6bd5fb7/test.json',
    )
      .then(data => {
        console.log('data', data);
        return data.json();
      })
      .then(info => {
        const arr = [...info.listings];
        let index = -1;
        const list = arr.map(elm => {
          if (index > 3) {
            index = 0;
          } else {
            index = index + 1;
          }
          return {...elm, image: images[index]};
        });

        setList(list);
      })
      .catch(err => console.error(err));
  }, []);

  const key = React.useCallback(item => item.id, []);

  // const Card = React.memo(<CardView />);

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={list}
        keyExtractor={key}
        renderItem={({item}) => <CardView info={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
});

export default App;
