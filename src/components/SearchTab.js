import React, { useState } from 'react';
import { SearchBar } from '@rneui/base';
import { View, Text, StyleSheet } from 'react-native';
import Record from './Record';
var data = require("../../data/anhviet.json");

const SearchTab = () => {
  const [value, setValue] = useState("");

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <SearchBar
          platform="default"
          containerStyle={{ borderRadius: 15 }}
          inputStyle={{color: '#000'}}
          lightTheme
          loadingProps={{}}
          onChangeText={newVal => setValue(newVal)}
          onClearText={() => console.log(onClearText())}
          placeholder="Search here..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          onCancel={() => console.log(onCancel())}
          value={value}
        />
        <Record
          onSpeechEnd={(value) => {
            setValue(value[0]);
          }}
          onSpeechStart={() => {
            setValue("");
          }}
        />
      </View>
      <View style={styles.dropdown}>
        {data.filter((item) =>{
          const searchTerm = value.toLowerCase();
          const word = item.tu.toLowerCase();
          return (
            searchTerm && word.startsWith(searchTerm) && word !== searchTerm
          );
        })
        .slice(0, 5)
        .map((item) => (
          <View style={styles.drop_row} key={item.tu}>
            <Text style={{padding: 10, color: '#fff'}}>
              {item.tu}
              <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}>  {item.dang}</Text>
            </Text>
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
  }
});

export default SearchTab;
