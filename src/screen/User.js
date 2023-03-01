import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';

const onGoogleButtonPress = async() => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn.then((user)=>{
        console.log(user);
    }).catch((error)=>{
        console.log(error);
    })
    return userSignIn;
}

const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

function User(){
    GoogleSignin.configure({
        webClientId: '35230379239-kupn96vmcq3i4m15c9ug8at4j15nne9l.apps.googleusercontent.com',
    });

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

    if (initializing) return null;
    
    if (!user) {
        return (
          <View style={styles.container}>
            <GoogleSigninButton
                style= {{
                    width: 275,
                    height: 75,
                    marginTop: 80
                }}
                onPress={onGoogleButtonPress}
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Wide}
            />
          </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: user.photoURL}}
                style={{width: 200, height: 200, borderRadius: 100, marginBottom: 50}}
            />
            <Text style={styles.text}> Welcome, {user.displayName}</Text>
            <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '400'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 200,
        borderRadius: 5,
        marginTop: 50,
        backgroundColor: '#2196F3'
    }
})

export default User