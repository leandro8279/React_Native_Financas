import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { AuthContent } from "../../contexts/auth";
import { Background, Container, Nome, Saldo, Title, List, Area } from "./style";
import HistoricoList from "../../components/HistoricoList";
import DatePicker from "../../components/DatePicker";
import firebase from "../../services/firebase";
import { format, isBefore } from 'date-fns';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {

    const [historico, setHistorico] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const { user } = useContext(AuthContent);
    const uid = user.uid;
    const database = firebase.database();
    useEffect(() => {
        async function carregarLista() {

            database.ref('users')
                .child(uid)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setSaldo(snapshot.val().valor);
                    }
                });
            database.ref('historico')
                .child(uid)
                .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
                .on('value', (snapshot) => {
                    setHistorico([]);
                    if (snapshot.exists()) {
                        snapshot.forEach((item) => {
                            var list = {
                                key: item.val().uid,
                                tipo: item.val().tipo,
                                valor: item.val().valor,
                                date: item.val().date,
                            };
                            setHistorico(oldArray => [...oldArray, list].reverse());
                        });
                    }
                });
        };
        carregarLista();
    }, [newDate]);

    function handleDelete(data) {
        //Pegando data do item:
        const [diaItem, mesItem, anoItem] = data.date.split('/');
        const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
        console.log(dateItem);

        //Pegando data hoje:
        const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
        const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
        const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
        console.log(dateHoje);
        if (isBefore(dateItem, dateHoje)) {
            // Se a data do registro já passou vai entrar aqui!
            alert('Voce nao pode excluir um registro antigo!');
            return;
        }
        Alert.alert("Cuidado Atenção!",
            `Você deseja excluir ${data.tipo} - valor: ${data.valor}`,
            [{
                text: 'Cancelar',
                style: 'cancel'
            }, {
                text: 'Continuar',
                onPress: () => handleDeleteSuccess(data)
            }
            ]);
    }
    async function handleDeleteSuccess(data) {
        await database.ref('historico')
            .child(uid)
            .child(data.key)
            .remove()
            .then(async () => {
                var saldoAtual = saldo;
                data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

                await database.ref('users').child(user.uid)
                    .child('valor').set(saldoAtual);
            }).catch((error) => {
                console.log(error);
            })

    }


    function handleShowPicker() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    const onChange = (date) => {
        setShow(Platform.OS === 'ios');
        setNewDate(date);
        console.log(date);
    }
    return (
        <Background>
            <Header />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            </Container>
            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <MaterialIcons name="event" color="#FFF" size={30} />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>
            <List
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
            />
            {show && (
                <DatePicker
                    onClose={handleClose}
                    date={newDate}
                    onChange={onChange}
                />
            )}
        </Background>
    );
}