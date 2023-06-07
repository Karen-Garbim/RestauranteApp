import { Card, Button, TextInput } from 'react-native-paper';
import { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import firebase from '../Firebase';
import {AuthContext} from '../AuthContext';

const NovoUsuario = ({ navigation }) => {
  let [nome, setNome] = useState('');
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  let usuario = null;
  const {setNomeUsuario} = useContext(AuthContext);

  const salvar = async () => {
    if (senha.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres");
    return;
    } 
      await firebase
      .auth().createUserWithEmailAndPassword(email, senha)
      .then(() => { setNomeUsuario(email); navigation.navigate('Navegacao'); })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use')
          alert("Este email já foi cadastrado!")
        else if (error.code == 'auth/invalid-email')
          alert("O email informado é inválido!")
        else 
          alert("Erro ao cadastrar o usuário: " +error.code)
      });


  };

  return (
    <ScrollView style={{ flex: 1, justifyContent: 'center' }}>
      <Card>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Digite seu email"
            keyboardType="email-address" style={{marginTop: 10}}
            onChangeText={setEmail} 
          />
          <TextInput
            mode="outlined"
            label="Senha"
            placeholder="Digite sua senha"
            onChangeText={setSenha}
            secureTextEntry={true}
          />
          <Button icon="check" mode="contained" onPress={salvar} style={{marginTop: 10}}>
            Salvar dados
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default NovoUsuario;