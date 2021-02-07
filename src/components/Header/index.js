import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Container, ButtonMenu } from "./style";

export default function Header() {
    const navigation = useNavigation();

    return (
        <Container>
            <ButtonMenu onPress={() => navigation.toggleDrawer()}>
                <Feather name="menu" color="#FFF" size={35} />
            </ButtonMenu>
        </Container>
    );
}