import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Image, Button, Divider } from "@rneui/themed";
import Constants from 'expo-constants';
const Sound = require('react-native-sound');
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// get height of phone screen
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const defaultWord = {"id": -1, "word": "", "form": "", "spelling": [""], "definition": [""], "audio": [""], "image": "https://ik.imagekit.io/ct201dict/banner.jpg"}
const Definition = ({ route, navigation }) => {
    const { id } = route.params;
    const[isBookmarked, setBookmarked] = useState(false);
    const [word, setWord] = useState(defaultWord);
    useEffect(() => {
        const db = firestore();
        db.collection("words").doc(String(id)).get().then((doc) => {
            setWord(doc.data());
        });
      });
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
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    // handle display of bookmark button
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user)=>{
            if(user){
                const docRef = firestore().collection('bookmarks').doc(user.uid)
                docRef.get().then((doc)=>{
                // get database if bookmark exists then set isBookmark to true
                if(doc.data()['bookmark'].find(({value})=> value === word.word)){
                    setBookmarked(true)
                }
            })
            }else{
                alert("you are not login")
            }
        });
        return subscriber; // unsubscribe on unmount
    });
    const addBookmark = () => {
        if(!user){
            alert("You need to login to add a bookmark")
        }else{
            const db = firestore();
            db.collection("bookmarks").doc(user.uid).update(
                {
                    bookmark: firestore.FieldValue.arrayUnion({id: String(id), value: word.word}),
                }
            )
            setBookmarked(true)
        }
    }
    const removeBookmark = () => {
        if(!user){
            alert("You need to login to remove a bookmark")
        }else{
            const db = firestore();
            db.collection("bookmarks").doc(user.uid).update(
                {
                    bookmark: firestore.FieldValue.arrayRemove({id: String(id), value: word.word}),
                }
            )
            setBookmarked(false)
        }
    }
    if (initializing) return null;
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
        return (word && (
            <ScrollView>
                <View style={styles.scrollView}>
                    <View style={styles.stack}>
                        <View style={styles.navigation}>
                            <Icon name='close' type='FontAwesome' color='#548787' size={40} onPress={() => navigation.goBack()}/>
                            {isBookmarked ? 
                            <Icon name='bookmark' type='FontAwesome' color='#548787' size={40} onPress={removeBookmark}/> 
                            : <Icon name='bookmark-border' type='FontAwesome' color='#548787' size={40} onPress={addBookmark}/>}
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
                        <Image source={{ uri:word.image}} containerStyle={styles.img}/>
                        {word.definition.map((def,idx)=>{
                            return (
                                <View  key={idx}>
                                    <Divider color='#548787' style={
                                        [idx===0 ? {display:'none'} : {display:'flex'},
                                        {width:"90%",margin :10}]
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
        ))
    }
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
        fontWeight: '300',
        color:'white'
    },
    box: {
        padding: 15, 
        borderRadius: 10,
        backgroundColor: '#fff',
        borderLeftColor: '#93EDBA',
        borderLeftWidth: 10
    },
    label: {
        marginVertical:10,
        borderRadius: 15,
    },
    def: {
        color:'#548787',
        fontSize: 17,
        fontWeight: '400'
    },
    audio:{
        padding: 5,
    },
    img: {
        aspectRatio: 1,
        marginVertical: 10,
        width: '100%'
    }
})
export default Definition