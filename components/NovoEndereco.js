import { TextInput, Button, Card } from 'react-native-paper';
import {ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './Utils';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../Firebase';

export default function MeusEnderecosScreen () {

  let [key, setKey] = useState('');
  let [tipoEndereco, setTipoEndereco] = useState('');
  let [logradouro, setLogradouro] = useState('');
  let [numero, setNumero] = useState('');
  let [bairro, setBairro] = useState('');
  let [cidade, setCidade] = useState('');
  let [estado, setEstado] = useState('');
  let [enderecos, setEnderecos] = useState([]);
  let [botaoInserir, setBotaoInserir] = useState(false);

  useEffect (() => {
    setEnderecos([]);
  }, []);

  const navigation = useNavigation();

  const limparCampos = () => {
    setTipoEndereco('');
    setLogradouro('');
    setNumero('');
    setBairro('');
    setCidade('');
    setEstado('');
  }
  
  const inserirEndereco = () => {
    if (tipoEndereco !== "" && logradouro !== "" && numero !== "" && bairro !== "" && cidade !== "" && estado !== "") {
      try {
        firebase.database().ref('endereço').push({tipoEndereco: tipoEndereco, logradouro: logradouro, numero: numero, bairro: bairro, cidade: cidade, estado: estado });
        alert("Registro inserido com sucesso!");
        limparCampos();
        navigation.navigate('Meus Endereços');

      } catch (e){
        alert("Erro ao inserir!");
      }
    }else{
      alert("Preencha todos os dados!");
    }
  }

  return (
    <ScrollView>
      <Card style={{margin: 10}}>
        <Card.Actions>
          <TouchableOpacity onPress={() => navigation.navigate('Meus Endereços')} style={{ position: 'absolute', top: 40, left: 10, padding: 5}}>
            <Icon name='arrow-left'/>
          </TouchableOpacity>
        </Card.Actions>
        <Card.Title
          title="Novo endereço" style={{flex: 1, margin: 10, alignSelf: 'center'}} />
        <Card.Content>
          <TextInput
            onChangeText={setTipoEndereco}
            value={tipoEndereco}
            mode="outlined"
            label="Tipo de Endereço"
            placeholder="Digite o tipo de endereço"
          />
          <TextInput
            onChangeText={setLogradouro}
            value={logradouro}
            mode="outlined"
            label="Logradouro"
            placeholder="Digite o logradouro"
          />
          <TextInput
            onChangeText={setNumero}
            value={numero}
            mode="outlined"
            label="Número"
            placeholder="Digite o número da residência"
          />
          <TextInput
            onChangeText={setBairro}
            value={bairro}
            mode="outlined"
            label="Bairro"
            placeholder="Digite o bairro onde mora"
          />
          <TextInput
            onChangeText={setCidade}
            value={cidade}
            mode="outlined"
            label="Cidade"
            placeholder="Digite a cidade"
          />
          <TextInput
            onChangeText={setEstado}
            value={estado}
            mode="outlined"
            label="Estado"
            placeholder="Digite o estado"
          />
        </Card.Content>
        <Card.Actions>
          <Button icon="check" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
            onPress={() => inserirEndereco()}>Salvar Dados
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
