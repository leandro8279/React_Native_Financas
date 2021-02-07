import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export const AuthContent = createContext({});
export default function AuthProvider({ children }) {
    const auth = firebase.auth();
    const database = firebase.database();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, []);
    //Logar Usuario
    async function signIn(emai, pass) {
        setLoadingAuth(true);
        await auth.signInWithEmailAndPassword(emai, pass)
            .then(async (value) => {
                await database.ref("users")
                    .child(value.user.uid)
                    .once('value')
                    .then((snapshot) => {
                        let data = {
                            uid: snapshot.val().uid,
                            nome: snapshot.val().nome,
                            email: snapshot.val().email,
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    });
            }).catch((error) => {
                Alert.alert(error.code)
                setLoadingAuth(false);
            });
    }
    //Cadastrar Usuario
    async function signUp(email, pass, nome) {
        setLoadingAuth(true);
        await auth.createUserWithEmailAndPassword(email, pass)
            .then(async (snapshot) => {
                var data = {
                    uid: snapshot.user.uid,
                    nome: nome,
                    email: email,
                    valor: 0
                };
                await database.ref('users').child(snapshot.user.uid).set(data);
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            }).catch((error) => {
                alert(error.code);
                setLoadingAuth(false);
            });
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }
    async function signOut() {
        await auth.signOut();
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            });
    }
    return (
        <AuthContent.Provider value={{ signed: !!user, user, loading, loadingAuth, signUp, signIn, signOut }}>
            {children}
        </AuthContent.Provider>
    );
}