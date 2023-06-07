import { List, Button, Card } from 'react-native-paper';
import {ScrollView, FlatList} from 'react-native';
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
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);

  useEffect (() => {
    setEnderecos([]);
    selecionarTodos();
  }, []);

  const navigation = useNavigation();

  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('endereço').orderByChild("tipoEndereco").on('value', (snapshot) => {
      itens = [];
      snapshot.forEach((linha) => {
        itens.push({
          key: linha.key,
          tipoEndereco: linha.val().tipoEndereco,
          logradouro: linha.val().logradouro,
          numero: linha.val().numero,
          bairro: linha.val().bairro,
          cidade: linha.val().cidade,
          estado: linha.val().estado

        });
      }); 
      setEnderecos(itens)
    }); 
  }


  const inserirEndereco = () => {
    navigation.navigate('Novo Endereço')
  }

  const alterarEndereco = (key, tipoEndereco, logradouro, numero, bairro, cidade, estado) => {
    navigation.navigate('Editar Endereço', {
      endereco: { key, tipoEndereco, logradouro, numero, bairro, cidade, estado },
    });
  };

  const excluirEndereco = (key) => {
    try {
      firebase.database().ref('endereço').child(key).remove();
      alert("Registro excluído com sucesso!");
    } catch (e){
      alert("Erro ao excluir!");
    }
  }



  return (
    <ScrollView>
      <List.Section>
    <List.Subheader></List.Subheader>
      <FlatList
        data={enderecos}
        renderItem={({ item }) => {
          return (
            <List.Item
              title={item.tipoEndereco}
              description={`${item.logradouro}, ${item.numero}, ${item.bairro}, ${item.cidade}, ${item.estado}`}
              right={() => (
                <>
                  <Button
                    icon="pencil"
                    mode="contained"
                    style={{ height: 25, width: 15 ,marginRight: 8, paddingLeft: 12,  alignItems: 'center'}}
                    onPress={() => alterarEndereco(item.key, item.tipoEndereco, item.logradouro, item.numero, item.bairro, item.cidade, item.estado)}
                  >
                  </Button>
                  <Button
                    icon="delete"
                    mode="contained"
                    style={{ height: 25, width: 25,paddingLeft: 12, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => excluirEndereco(item.key)}
                  >
                  </Button>
                </>
              )} 
            />
          );
        }}
      />
      </List.Section>
      <Card.Actions>
        <Button icon="plus" mode="contained" style={styles.button}
          onPress={() => inserirEndereco()}>Novo Endereço
        </Button>
      </Card.Actions>
    </ScrollView>
  );
}