import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Icon, Image, Button } from "@rneui/themed";
const Sound = require('react-native-sound');
import storage from '@react-native-firebase/storage';
import data from '../../data/en_UK.json';

// const playTrack = async() => {
//     const url = await  storage().ref('audio/a/a__gb_2.mp3').getDownloadURL();
//     const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
//       if (e) {
//         console.log('error loading track:', e)
//       } else {
//         track.play()
//       }
//     })
// }
const Definition = ({ route, navigation }) => {
    const { id } = route.params;
    const[word, setWord] = useState({});
    const[isBookmarked, setBookmarked] = useState(false);
    const search = data.filter((item) => {
        return item.id = id;
    })
    setWord(search)
    // if(!word)
    // {
    //     return (
    //         <View>
    //             <Icon name='chevron-left' type='FontAwesome' color='#548787' size={40} onPress={() => navigation.goBack()}/>
    //             <Text>Word not found</Text>
    //         </View>
    //     )
    // }
    return (
        <View style={styles.scrollView}>
            <Icon name='chevron-left' type='FontAwesome' color='#548787' size={40} onPress={() => navigation.goBack()}/>
            <View style={styles.stack}>
                <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.word}</Text>
                    {isBookmarked ? 
                    <Icon name='bookmark' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(false)}/> 
                    : <Icon name='bookmark-border' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(true)}/>}
                </View>
                <View>
                    <Image source={{ uri:word.image}}/>
                    <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.form}</Text> 
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: 800, backgroundColor: "white",
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 40
    }
})
export default Definition