import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { PickerView } from './styles';

export default function PikerAndroid({ onChange, tipo }) {
    return (
        <PickerView>
            <Picker
                style={{ width: '100%' }}
                selectedValue={tipo}
                onValueChange={(valor) => onChange(valor)}>
                <Picker.Item label='Receita' value='receita' color='#222' />
                <Picker.Item label='Receita' value='receita' color='#222' />
                <Picker.Item label='Despesa' value='despesa' color='#222' />
            </Picker>
        </PickerView>
    )
}