import {TextInput, Button, Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import {styles} from './Utils';
import { useNavigation } from '@react-navigation/native';
import firebase from '../Firebase';

export default function EditarEnderecoScreen({ route }) {
  const [tipoEndereco, setTipoEndereco] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  let [botaoInserir, setBotaoInserir] = useState(false);

  const navigation = useNavigation();

  const { endereco } = route.params;
  const { key, tipoEndereco: initialTipoEndereco, logradouro: initialLogradouro, numero: initialNumero, bairro: initialBairro, cidade: initialCidade, estado: initialEstado } = endereco;

  useEffect(() => {
    setTipoEndereco(initialTipoEndereco);
    setLogradouro(initialLogradouro);
    setNumero(initialNumero);
    setBairro(initialBairro);
    setCidade(initialCidade);
    setEstado(initialEstado);
  }, []);

  const alterarEndereco = () => {
    try {
      firebase.database().ref('endereço').child(key).update({ tipoEndereco, logradouro, numero, bairro, cidade, estado });
      alert('Registro alterado com sucesso!');
      navigation.navigate('Meus Endereços')
    } catch (e) {
      alert('Erro ao alterar!');
    }
  };

  return (
    <ScrollView>
      <Card style={{margin: 10}}>
        <Card.Actions>
          <TouchableOpacity onPress={() => navigation.navigate('Meus Endereços')} style={{ position: 'absolute', top: 40, left: 10, padding: 5}}>
            <Icon name='arrow-left'/>
          </TouchableOpacity>
        </Card.Actions>
        <Card.Title title="Editar endereço" style={{flex: 1, margin: 10, alignSelf: 'center'}}/>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Tipo de Endereço"
            onChangeText={setTipoEndereco}
            value={tipoEndereco}
          />
          <TextInput
            mode="outlined"
            label="Logradouro"
            onChangeText={setLogradouro}
            value={logradouro}
          />
          <TextInput
            mode="outlined"
            label="Número"
            onChangeText={setNumero}
            value={numero}
          />
          <TextInput
            mode="outlined"
            label="Bairro"
            onChangeText={setBairro}
            value={bairro}
          />
          <TextInput
            mode="outlined"
            label="Cidade"
            onChangeText={setCidade}
            value={cidade}
          />
          <TextInput
            mode="outlined"
            label="Estado"
            onChangeText={setEstado}
            value={estado}
          />
        </Card.Content>
        <Card.Actions>
          <Button icon="check" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
           onPress={alterarEndereco}>
            Salvar Alterações
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}