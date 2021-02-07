import React, { useState, useContext } from 'react';
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from 'react-native';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Header from "../../components/Header";
import Picker from '../../components/Picker';
import firebase from "../../services/firebase";
import { AuthContent } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
export default function New() {
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState(null);
    const { user } = useContext(AuthContent);

    const navigation = useNavigation();
    function handleSubmit() {
        Keyboard.dismiss();
        if (isNaN(parseFloat(valor)) || tipo === null) {
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} - Valor: ${parseFloat(valor)} `,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        );
        async function handleAdd() {
            const database = firebase.database();
            const uid = user.uid;
            const key = database.ref('historico').child(uid).push().key
            await database.ref('historico/' + uid)
                .child(key)
                .set({
                    uid: key,
                    tipo: tipo,
                    valor: parseFloat(valor),
                    date: format(new Date(), 'dd/MM/yyyy')
                });

            //Atualizar o nosso saldo
            const usuario = database.ref('users').child(uid);
            await usuario.once('value').then((dados) => {
                var saldo = parseFloat(dados.val().valor);
                tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);
                usuario.child('valor').set(saldo);
                Keyboard.dismiss();
                setValor('');
                navigation.navigate('Home');
            });
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <Header />
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="Valor desejado"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                    />
                    <Picker onChange={setTipo} tipo={tipo} />
                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    );
}
