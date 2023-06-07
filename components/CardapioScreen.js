import { ScrollView, Image, TouchableOpacity, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from './Utils';
import { useContext } from 'react';
import { DataContext } from '../Context';

function CardapioScreen({ navigation }) {

  const { setNomeProduto, setDescricaoProduto, setValorProduto, setImagemProduto } =
    useContext(DataContext);

  const visualizarProduto = (nomeProduto, descricaoProduto, valorProduto, imagemProduto) => {
    setNomeProduto(nomeProduto);
    setDescricaoProduto(descricaoProduto);
    setValorProduto(valorProduto);
    setImagemProduto(require(imagemProduto));
    navigation.navigate('Visualizar Produto');
  };

  return (
    <ScrollView style={styles.scrolview}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => visualizarProduto('Hamburguer', "Pão, hamburguer, alface, tomate, cebola, picles", 35, '../assets/hamburger.jpg')}>
        <Image style={styles.itemImage} source={require('../assets/hamburger.jpg')} />
        <View style={styles.cardContent}>
          <Card.Title title="Hamburger"  />
          <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode='tail'>
            Pão, hamburguer, alface, tomate, cebola, picles
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer}
        onPress={() =>
          visualizarProduto('Pizza Marguerita', "Mussarela, tomate e manjericão",  40, '../assets/pizza-marguerita.jpg')
        }>
        <Image style={styles.itemImage}
          source={require('../assets/pizza-marguerita.jpg')}
        />
        <Card.Title style={styles.cardTitle}
          title="Pizza Marguerita"
          subtitle="Mussarela, tomate e manjericão"
          
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer}
        onPress={() =>
          visualizarProduto('Salmão assado', "Salmão assado com ervas finas", 50, '../assets/salmon-assado.jpg')
        }>
        <Image style={styles.itemImage}
          source={require('../assets/salmon-assado.jpg')}
        />
        <Card.Title
          title="Salmão assado"
          subtitle="Salmão assado com ervas finas"/>
      </TouchableOpacity>


      <TouchableOpacity style={styles.itemContainer}
        onPress={() =>
          visualizarProduto('Salmão cru', "Salmão cru", 30, '../assets/salmon-cru.jpg')
        }>
        <Image style={styles.itemImage}
          source={require('../assets/salmon-cru.jpg')}
        />
        <Card.Title
          title="Salmão Cru"
          subtitle="Salmão cru"/>
      </TouchableOpacity>

    </ScrollView>
  );
}

export default CardapioScreen;
