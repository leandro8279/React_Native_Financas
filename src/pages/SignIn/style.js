import React from "react";
import styled from "styled-components";

export const Background = styled.View`
    flex:1px;
    background-color:#131313;

`;
export const Container = styled.KeyboardAvoidingView`
    flex:1px;
    align-items:center;
    justify-content:center;

`;
export const AreaInput = styled.View`
    flex-direction:row;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255,0.20)'
})`
    background-color: rgba(0,0,0,20);
    width:90%;
    color:#FFF;
    font-size:17px;
    margin-bottom:15px;
    padding:10px;
    border-radius:7px;
`;
export const Logo = styled.Image`
    margin-bottom:15px;
`;
export const SubmitButton = styled.TouchableOpacity`
    background-color:#00B94a;
    align-items:center;
    justify-content:center;
    width:90%;
    height:45px;
    border-radius:7px;
    margin-top:10px;
`;
export const SubmitText = styled.Text`
    font-size:20px;
    color:#131313;
`;
export const Link = styled.TouchableOpacity`
    margin-top:5px;
    margin-bottom:10px;
`;
export const LinkText = styled.Text`
    color:#FFF;
`;