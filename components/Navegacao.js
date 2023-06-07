import { createDrawerNavigator} from '@react-navigation/drawer';
import CardapioScreen from './CardapioScreen';
import CarrinhoScreen from './CarrinhoScreen';
import EditarEndereco from './EditarEndereco';
import MeusEnderecos from './MeusEnderecos';
import NovoEndereco from './NovoEndereco';
import VisualizarProdutoScreen from './VisualizarProdutoScreen';
import Home from './Home';
import Logout from './Logout';


const Drawer = createDrawerNavigator();

const Navegacao = () => {

  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cardápio" component={CardapioScreen} />
      <Drawer.Screen name="Carrinho" component={CarrinhoScreen} />
      <Drawer.Screen name="Meus Endereços" component={MeusEnderecos} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Novo Endereço" component={NovoEndereco} options={{drawerLabel: () => null, unmountOnBlur: true, gestureEnabled: false}}/>
      <Drawer.Screen name="Editar Endereço" component={EditarEndereco} options={{drawerLabel: () => null, unmountOnBlur: true, gestureEnabled: false}}/>
      <Drawer.Screen name="Visualizar Produto" component={VisualizarProdutoScreen} options={{drawerLabel: () => null, unmountOnBlur: true, gestureEnabled: false}}/>
      
    </Drawer.Navigator>
  );
  
};

export default Navegacao;