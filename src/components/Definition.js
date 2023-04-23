import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Image, Button, Divider } from "@rneui/themed";
import Constants from 'expo-constants';
const Sound = require('react-native-sound');
import storage from '@react-native-firebase/storage';
import data from '../../data/en_UK.json';
import firestore from '@react-native-firebase/firestore';

// get height of phone screen
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

const Definition = ({ route, navigation }) => {
    const { id } = route.params;
    const[isBookmarked, setBookmarked] = useState(false);
    const [word, setWord] = useState(data[0]);
    const updateState = data => {
        setWord(data)
    }
    useEffect(() => {
        const db = firestore();
        db.collection("words").doc(String(id)).get().then((doc) => {
            updateState(doc.data());
        });
      },[])
    const playTrack = async(audio) => {
        const url = await storage().ref(audio).getDownloadURL();
        const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('error loading track:', e)
            }else{
                track.play()
            }
        })
    }
    if(id == -1){
        return (
            <View style={styles.notFound}>
                <Text style={styles.text}>Word not found</Text>
                <Button
                title={'Go Back'}
                color= '#7AD6BC'
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
                    <View>
                        <LinearGradient 
                        colors={['#191E5D', '#0F133A']} 
                        start={{ x: 0, y: 0 }} 
                        end={{ x: 1, y: 0 }}
                        locations={[0.2,0.8]} 
                        style={styles.label}>
                            <Text style={styles.word}> {word.word}</Text>
                            <Text style={styles.form}> {word.form}</Text>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    {word.spelling.map((spell, idx)=>{
                                        return <Text style={styles.form} key={idx}> {spell}</Text>
                                    })}
                                </View>
                                <View>
                                    {word.audio.map((audio, idx)=>{
                                        return (
                                            <View style={styles.audio} key={idx}> 
                                                <Icon name="volume-up" type="font-awesome" color='#f50' onPress={()=>playTrack(audio)}/>
                                            </View>
                                        )
                                    })} 
                                </View> 
                            </View>
                        </LinearGradient>
                    </View>
                    <Image source={{ uri:word.image}}/>
                    {word.definition.map((def,idx)=>{
                        return (
                            <View  key={idx}>
                                <Divider color='#548787' style={
                                    [idx===0 ? {display:'none'} : {display:'flex'},
                                    {width:"90%",margin:20}]
                                }/>
                                <View style={styles.box}>
                                    <Text style={styles.def}>{def}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )}
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#F1F3F4",
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
        padding: 5, 
        fontSize: 25, 
        fontWeight: '500',
        color:'white'
    },
    form: {
        textTransform: 'capitalize',
        padding: 5, 
        fontStyle: 'italic', 
        fontSize: 15, 
        fontWeight: '200',
        color:'white'
    },
    box: {
        padding: 15, 
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    label: {
        marginTop:10,
        marginBottom:30,
        borderRadius: 15,
    },
    def: {
        color:'#548787',
        fontSize: 17,
        fontWeight: '400'
    },
    audio:{
        padding: 5,
    }
})
export default Definition