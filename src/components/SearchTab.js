import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/base';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SearchTab = (props) => {
  const [data, setTest] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    let all = []
    const db = firestore();
    db
      .collection('words')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
    
        querySnapshot.forEach(documentSnapshot => {
          all.push(documentSnapshot.data());
        });
        setTest(all)
      });
  })
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
    setValue('');
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
    setValue('');
  };
  if(!data){
    return (
      <Text>Your usage is over limited </Text>
    )
  }
  return (
    <View style={{alignItems:'center'}}>
      <View>
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
        .slice(0, 6)
        .map((item, idx) => (
          <View style={styles.drop_row} key={idx}>
            <TouchableOpacity style={{color: '#fff',flexDirection:'row' , alignItems:'center'}} onPress={()=>handleDropdown(item.word)}>
              <Text style={styles.word}>{item.word}</Text>
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
    marginTop: 10,
    width: 350,
    flexDirection: 'column',
    backgroundColor: '#548787',
    borderRadius: 5,
    alignItems:'center',
    zIndex: 1
  },
  drop_row: {
    width: 300,
    textAlign: 'left',
    borderBottomColor: '#9EF78D',
    borderBottomWidth: 0.6,
    paddingVertical: 10
  },
  word: {
    padding: 10,
    fontSize: 15,
    fontWeight: '400'
  },
  form: {
    padding: 10,
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '200'
  }
});

export default SearchTab;
