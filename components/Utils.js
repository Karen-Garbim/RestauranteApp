import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  },
  card: {
    margin: 5,
    marginBottom: 10
  },

  image: {
    width: 300,
    height: 300,
    alignSelf: 'left'
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: -10,
    textAlign: 'left',
    width: '85%',
  },

  button: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'Center'
  },
  buttonCrud: {
    flex: 1,
    padding: 5, 
    marginLeft: 5,
    justifyContent: 'right',
    alignItems: 'right'
  },
  buttonImageCrud: {
    marginTop: 10
  },

  paragraph:{
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'right' 

  },

  text: {
    color: '#000000',
    fontSize: 20,
  },

  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
    
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 30
  },

  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 999,
  }
})

export const valorFormatado = (valor) => {
  return valor.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
};


