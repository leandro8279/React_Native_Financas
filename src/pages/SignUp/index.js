import React from 'react';
import { useState, useContext } from 'react';
import {
    Container,
    Background,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
} from "./style";
import { Platform, ActivityIndicator } from 'react-native';
import { AuthContent } from "../../contexts/auth";
export default function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContent);


    function handlerSignUp() {
        signUp(email, pass, nome);
    }
    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled>
                <AreaInput>
                    <Input
                        placeholder='Nome Completo'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={nome}
                        onChangeText={(nome) => setNome(nome)} />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder='Email'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(email) => setEmail(email)} />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder='Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={pass}
                        secureTextEntry={true}
                        onChangeText={(pass) => setPass(pass)}
                    />
                </AreaInput>
                <SubmitButton onPress={handlerSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                                <SubmitText>Cadastrar</SubmitText>
                            )
                    }
                </SubmitButton>

            </Container>
        </Background>
    );
}