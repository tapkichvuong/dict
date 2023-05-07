import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Constants from 'expo-constants';

const Bookmark = ({navigation}) => {
    const [bookmark, setBookmark] = useState([]);
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user)=>{
            let bookmark = []
            if(user){
                const docRef = firestore().collection('bookmarks').doc(user.uid)
                docRef.get().then((doc)=>{
                    // get database if bookmark exists then set isBookmark to true
                    bookmark = doc.data()['bookmark']
                    bookmark = bookmark.sort()
                    setBookmark(bookmark)
                })
            }
        });
        return subscriber; // unsubscribe on unmount
    });
    const handlePress = (id) => {
        navigation.navigate('Definition', {id: id});
    }
    return (
        <ScrollView style={styles.container}>
            <View styles={styles.header}>
                <Text style={styles.headerLB}>
                    Bookmarks
                </Text>
            </View>
            {bookmark && bookmark.map((word, idx)=>{
                return (
                    <View  key={idx}>
                        <TouchableOpacity onPress={()=>handlePress(word.id)}>
                            <View style={styles.box}>
                                <Text style={styles.word}>{word.value}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 50,
        backgroundColor: "#F1F3F4",
        flexDirection: "column",
    },
    header:{
        alignItems: 'center',
        margin: 10,
    },
    headerLB:{
        textTransform: 'capitalize',
        padding: 5, 
        fontSize: 25, 
        fontWeight: '500',
        color:'#548787'
    },
    box: {
        marginVertical: 10,
        padding: 20, 
        borderRadius: 10,
        backgroundColor: '#fff',
        borderLeftColor: '#93EDBA',
        borderLeftWidth: 10
    },
    word: {
        color:'#548787',
        fontSize: 25,
        fontWeight: '500'
    },
})
export default Bookmark