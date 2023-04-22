import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/base';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// var data = require('../../data/en_UK.json');
import firestore from '@react-native-firebase/firestore';

const SearchTab = (props) => {
  const [data, setData] = useState();
  const [test, setTest] = useState();
  const [value, setValue] = useState("");
  getWord = async() => {
    let all = []
    const wordCollection = await firestore().collection('words');
    wordCollection.get().then(querySnapshot => {
      querySnapshot.forEach((doc)=> all.push(doc.data()));
    });
    setTest(all)
  }
  console.log(test)
  const handleSubmit = () => {
    const search = data.filter(
      (item) => {
        return item.word === value.toLowerCase()
      }
    )
    if(search.length == 0){
      props.onSubmit(-1)
    }else{
      props.onSubmit(search[0].id);
    }
  }
  const handleDropdown = (searchTerm) => {
    const search = data.filter(
      (item) => {
        return item.word === searchTerm.toLowerCase()
      }
    )
    if(search.length == 0){
      props.onSubmit(-1)
    }else{
      props.onSubmit(search[0].id);
    }
  };
  if(!data){
    return (
      <Text>Your usage is over limited </Text>
    )
  }
  return (
    <View>
      <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
        <SearchBar
          platform="default"
          containerStyle={{ borderRadius: 15, width: 350}}
          inputStyle={{color: '#000', height: 60}}
          lightTheme
          onChangeText={(newVal) => setValue(newVal)}
          placeholder="Search here..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          value={value}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.dropdown}>
        {data.filter((item) =>{
          const searchTerm = value.toLowerCase();
          const word = item.word.toLowerCase();
          return (
            searchTerm && word.startsWith(searchTerm) && word !== searchTerm
          );
        })
        .slice(0, 5)
        .map((item, idx) => (
          <View style={styles.drop_row} key={idx}>
            <TouchableOpacity style={{padding: 10, color: '#fff', flexDirection:'row', alignItems:'center'}} onPress={()=>handleDropdown(item.word)}>
              <Text>{item.word}</Text>
              <Text style={styles.form}> {item.form}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 80,
    marginTop: 5,
    flexDirection: 'column',
    backgroundColor: '#548787',
    borderRadius: 5,
    zIndex: 1
  },
  drop_row: {
    width: 300,
    textAlign: 'left',
    marginHorizontal: 10,
    borderBottomColor: '#9EF78D',
    borderBottomWidth: 0.6
  },
  form: {
    padding: 10,
    fontStyle: 'italic',
    fontSize: 11,
    fontWeight: '200'
  }
});

export default SearchTab;
