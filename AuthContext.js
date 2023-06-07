import {useState, useEffect, createContext} from 'react';
import firebase from './Firebase';

export const AuthContext = createContext();

export default AuthContextProvider = ({children}) => {
  
  const [user, setUser] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null);

  useEffect( () => {
    firebase.auth().onAuthStateChanged((usuarioLogado) => { setUser(usuarioLogado) });
  }, []);

  return (
    <AuthContext.Provider 
      value={{user, nomeUsuario, setNomeUsuario }}>
      {children} 
    </AuthContext.Provider>
  );

}
