import React, { useState } from 'react';
import { SearchBar } from '@rneui/base';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed'; 

const data = require('../../data/en_UK.json');

const SearchTab = (props) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const search = data.filter(
      (data) => {
        return data.word = value
      }
    )
    props.onSubmit(search.id);
  }
  return (
    <View>
      <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
        <SearchBar
          platform="default"
          containerStyle={{ borderRadius: 15, width: 300}}
          inputStyle={{color: '#000'}}
          lightTheme
          onChangeText={newVal => setValue(newVal)}
          placeholder="Search here..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          value={value}
        />
        <Icon name='search' type='FontAwesome' size={35} color='black' onPress={handleSubmit}/>
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
        .map((item) => (
          <View style={styles.drop_row} key={item.word}>
            <TouchableOpacity style={{padding: 10, color: '#fff', flexDirection:'row', alignItems:'center'}} onPress={()=>setValue(item.word)}>
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
    marginTop: 5,
    flexDirection: 'column',
    backgroundColor: '#548787',
    borderRadius: 5,
    zIndex: 1
  },
  drop_row: {
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
