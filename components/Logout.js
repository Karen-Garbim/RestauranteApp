import firebase from '../Firebase';
import {useEffect} from 'react';

const Logout = ({ navigation }) => {

  useEffect(() => {
    sair();
  }, []);

  const sair = () => {
    firebase.auth().signOut();
    navigation.navigate("Login");
  }

  return (<></>);
}

export default Logout;