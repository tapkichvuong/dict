import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Image, Button  } from "@rneui/themed";
import Constants from 'expo-constants';
const Sound = require('react-native-sound');
import storage from '@react-native-firebase/storage';
import data from '../../data/en_UK.json';

// get height of phone screen
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

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
    const[isBookmarked, setBookmarked] = useState(false);
    const search = data.find(item => item.id === id)
    const[word, setWord] = useState(search);
    if(id == -1){
        return (
            <View style={styles.notFound}>
                <Text style={styles.text}>Word not found</Text>
                <Button
                title={'Go Back'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
              }}
              onPress={navigation.goBack}
            />
            </View>
        );
    }else {
    return (
        <ScrollView>
            <View style={styles.scrollView}>
                <View style={styles.stack}>
                    <View style={styles.navigation}>
                        <Icon name='close' type='FontAwesome' color='#548787' size={40} onPress={() => navigation.goBack()}/>
                        {isBookmarked ? 
                        <Icon name='bookmark' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(false)}/> 
                        : <Icon name='bookmark-border' type='FontAwesome' color='#548787' size={40} onPress={() => setBookmarked(true)}/>}
                    </View>
                    
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.box}>
                        <Text style={styles.word}> {word.word}</Text>
                        <Text style={{padding: 10, fontStyle: 'italic', fontSize: 11, fontWeight: '200'}}> {word.form}</Text> 
                    </LinearGradient>
                    <Image source={{ uri:word.image}}/>
                </View>
            </View>
        </ScrollView>
    )}
}

const styles = StyleSheet.create({
    scrollView: {
        height: 800, 
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight,
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 40
    },
    notFound:{
        height: windowHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 16,
    },
    navigation:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent: 'space-between'
    },
    word: {
        textTransform: 'capitalize',
        padding: 10, 
        fontStyle: 'italic', 
        fontSize: 16, 
        fontWeight: '200'
    },
    box: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
})
export default Definition