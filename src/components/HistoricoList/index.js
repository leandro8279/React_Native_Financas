import React from 'react';
import { TouchableWithoutFeedback } from "react-native";
import { Container, Tipo, IconView, ValorText, TipoText } from '../HistoricoList/styles';
import { Feather } from '@expo/vector-icons';
export default function HistoricoList({ data, deleteItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
            <Container>
                <Tipo>
                    <IconView tipo={data.tipo}>
                        <Feather
                            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
                            color="#FFF"
                            size={20}
                        />
                        <TipoText>{data.tipo}</TipoText>
                    </IconView>
                </Tipo>
                <ValorText>
                    R$ {data.valor}
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>
    );
}