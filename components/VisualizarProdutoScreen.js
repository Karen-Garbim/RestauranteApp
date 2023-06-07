import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Button, Title} from 'react-native-paper';
import { styles, valorFormatado } from './Utils';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';

const VisualizarProdutoScreen = ( {navigation} ) => {
  
  let { nomeProduto, setNomeProduto, descricaoProduto, setDescricaoProduto, valorProduto, setValorProduto, 
        imagemProduto, setImagemProduto, produtos, setProdutos, total, setTotal, quantidade, setQuantidade} = useContext(DataContext);

  const adicionarNoCarrinho = () => {
      let produto = produtos;
      const busca = produto.find(p => p.nome === nomeProduto);
      
      if (busca){
        const indice = produto.findIndex(p => p.nome === nomeProduto);
        produto[indice].qtd = produto[indice].qtd + 1;
        setTotal(total + produto[indice].valor);
      }
      else{
        produto.push({nome: nomeProduto, descricao: descricaoProduto , valor: valorProduto, qtd: 1});
        setProdutos(produto);
        setTotal(Number(total) + Number(valorProduto));
        setNomeProduto(null);
        setValorProduto(0);
        setImagemProduto(null);        
      }

      navigation.navigate('Carrinho');
 
  }

  return (
    <Card style={styles.card}>
      <Card.Actions>
        <TouchableOpacity onPress={() => navigation.navigate('Cardápio')} style={{ position: 'absolute', top: 40, left: 10, padding: 5}}>
          <Icon name='arrow-left'/>
        </TouchableOpacity>
      </Card.Actions>
      <Card.Title title={nomeProduto} style={{flex: 1, margin: 10, alignSelf: 'center'}} />
      <Card.Content>
        <Image source={imagemProduto} style={styles.image}/>
        <Card.Title subtitle={descricaoProduto} />
        <Title style={styles.title}>
          {valorFormatado(valorProduto)}
        </Title>
      </Card.Content>
      <Card.Actions>
        <Button icon="check" mode="contained" onPress={() => adicionarNoCarrinho()} style={styles.button}>
          Adicionar ao Carrinho 
        </Button>
      </Card.Actions>
      <Card.Actions>
        <Button icon="arrow-left" mode="outlined" onPress={() => navigation.navigate('Cardápio')} style={styles.button} >
          Voltar
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default VisualizarProdutoScreen;
