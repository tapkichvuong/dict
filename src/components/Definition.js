import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Image } from "@rneui/themed";
import data from '../../data/anhviet.json'

const Definition = () => {
    const[isBookmarked, setBookmarked] = useState(false);
    const[word, setWord] = useState();
    if(!word)
    {
        return (
            <View>
                <Text>Find meanings and save for quick reference</Text>
            </View>
        )
    }
    return (
        <View style={styles.stack}>
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.tu}</Text>
                {isBookmarked ? 
                <Icon name='bookmark' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(false)}/> 
                : <Icon name='bookmark-border' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(true)}/>}
            </View>
            <View>
                {/* <Image source={{ uri:}}/> */}
                <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.dang}</Text>
                <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.nghia}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 40
    }
})
export default Definition