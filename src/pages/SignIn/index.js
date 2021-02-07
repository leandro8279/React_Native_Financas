import React from 'react';
import { useState, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Background,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText
} from "./style";
import { Platform, ActivityIndicator } from 'react-native';
import { AuthContent } from "../../contexts/auth";

export default function SignIn() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContent);
    function handlerLogin() {
        signIn(email, pass);
    }
    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled>
                <Logo source={require('../../assets/Logo.png')} />
                <AreaInput>
                    <Input
                        placeholder='Email'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder='Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={pass}
                        onChangeText={(pass) => setPass(pass)}
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton onPress={handlerLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                                <SubmitText>Acessar</SubmitText>
                            )
                    }
                </SubmitButton>
                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>
            </Container>
        </Background>
    );
}