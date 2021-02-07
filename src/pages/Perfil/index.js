import React, { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from "./style";
import { AuthContent } from "../../contexts/auth";
import Header from "../../components/Header";
export default function Perfil() {

    const navigation = useNavigation();
    const { user, signOut } = useContext(AuthContent);
    return (
        <Container>
            <Header />
            <Nome>
                {user && user.nome}
            </Nome>
            <NewLink onPress={() => navigation.navigate('New')}>
                <NewText>
                    Registrar gastos
                </NewText>
            </NewLink>
            <Logout onPress={() => signOut()}>
                <LogoutText>
                    Sair
                </LogoutText>
            </Logout>
        </Container>
    );
}