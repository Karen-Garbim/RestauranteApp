import { Card, Button, TextInput, Title, Snackbar } from 'react-native-paper';
import { useState, useContext } from 'react';
import { View } from 'react-native';
import firebase from '../Firebase';
import {AuthContext} from '../AuthContext';

const Login = ({ navigation }) => {
  let [visivel, setVisivel] = useState(false);
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  let {setNomeUsuario} = useContext(AuthContext);

  const mostrarSnack = () => setVisivel(true);

  const fecharSnack = () => setVisivel(false);

  const acessar = () => {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      setNomeUsuario(email);
      navigation.navigate("Navegacao");
      })
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Card>
        <Card.Content>
          <Title>Acessar o Aplicativo</Title>
          <TextInput mode="outlined"
            label="Email"
            placeholder="Digite seu email"
            onChangeText={setEmail}
            value={email} style={{marginTop: 10}}
          />
          <TextInput mode="outlined"
            label="Senha"
            placeholder="Digite sua senha"
            onChangeText={setSenha}
            secureTextEntry={true}
            value={senha} style={{marginTop: 10}}
          />
          <Button icon="arrow-right" mode="contained" onPress={acessar} style={{marginTop: 25}}>
            Acessar
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('NovaConta')} style={{marginTop: 10}}>
            Nova conta
          </Button>
        </Card.Content>
      </Card>
      <Snackbar
        visible={visivel}
        onDismiss={fecharSnack}
        action={{ label: 'Fechar' }}>
        Nome de usuário e/ou senha incorretos!
      </Snackbar>
    </View>
  );
};

export default Login;