import { FlatList, ScrollView, TouchableOpacity} from 'react-native';
import { Card, Paragraph, Button, List, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, valorFormatado } from './Utils';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';
import firebase from '../Firebase';
import {AuthContext} from '../AuthContext';

const CarrinhoScreen = ({ navigation }) => {

  let {email, setEmail} = useState('');
  let {produtos, setProdutos, total, setTotal, quantidade, setQuantidade} = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const excluirProduto = (index) => {
    let produto = produtos;
    if (produto[index].qtd <= 1){
      produto[index].qtd = produto[index].qtd - 1;
      setTotal(total - produto[index].valor);
      produto = produto.filter((item) => item !== produto[index]);
      setProdutos(produto);
    }
    else{
      produto[index].qtd = produto[index].qtd - 1;  
      setTotal(total - produto[index].valor);   
    }
  };

  const adicionarProduto = (index) => {
    let produto = produtos;
    produto[index].qtd = produto[index].qtd + 1;
    setTotal(total + produto[index].valor);
  };

  const finalizarCompra = () => {
    if (user && email !== "" && produtos.length > 0) {
      try {
        firebase.database().ref('pedidos').push({
          email: user.email // Aqui, usamos o email do usuário autenticado
        });

        produtos.forEach((produto) => {
          firebase.database().ref('pedidos').push({
            nome: produto.nome,
            valor: (produto.valor * produto.qtd),
            quantidade: produto.qtd
          });
        });

        alert("Compra finalizada com sucesso!");
        setProdutos([]);
        setTotal(0);
        setQuantidade(0);
        navigation.navigate('Cardápio')
      } catch (e) {
        alert("Erro ao finalizar compra: " + e);
      }
    }else if (!user) {
      alert("Você precisa estar logado para finalizar a compra.");
    }
      else {
      alert("Informe um email válido e adicione produtos ao carrinho!");
    }
  };
  return (
    <ScrollView>
      <Card >
        <Card.Actions>
          <TouchableOpacity onPress={() => navigation.navigate('Cardápio')} style={{ position: 'absolute', top: 40, left: 10, padding: 5}}>
            <Icon name='arrow-left'/>
          </TouchableOpacity>
        </Card.Actions>
        <Card.Title title='Meu Carrinho' style={{flex: 1, margin: 10, alignSelf: 'center'}}  />
        <Card.Content>
          {produtos.length ? (
            <FlatList style={styles.flatlist}
              data={produtos}
              renderItem={({ item, index }) => {
                return (
                  <List.Accordion title={item.nome}>
                  <List.Item title={'Valor: ' + valorFormatado(item.valor)} />
                  <List.Item 
                    left={(props) => (
                      <Button mode="contained" onPress={() => excluirProduto(index)}>
                        -
                      </Button>)}
                    description={
                      <Text style={{margin: 65}}>{item.qtd}</Text>
                    }
                    right={(props) => (
                      <Button mode="contained" onPress={() => adicionarProduto(index)}>
                        +
                      </Button>
                    )}
                  />
                </List.Accordion>
                );
              }}
            />
          ) : (
            <Paragraph>Nenhum item no carrinho!</Paragraph>
          )}
          {total != 0 ? (
            <Paragraph style={styles.paragraph}>
              Valor total:
              {valorFormatado(total)}
            </Paragraph>
          ) : (
            <></>
          )}
          <Card.Actions style={{marginTop: 20}}>
            <Button icon="check" mode="contained" onPress={() => finalizarCompra()} style={styles.button} >
                Finalizar Compra
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default CarrinhoScreen;
