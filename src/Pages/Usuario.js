import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Usuarios from '../Components/Usuarios'
import { ActivityIndicator } from 'react-native';


export default function Usuario() {

    const[usuarios, setUsuarios] = useState([]);
    const[error, setError] = useState(false);

  async function getUsuarios(){
    await fetch('http://10.139.75.98:5251/api/Usuarios/GetAllUsuarios' , {
            method: 'GET',
            headers:{
                'content-type' : 'application/json'
            }
        })
        .then( res => (res.ok == true) ? res.json () : false)
        .then(json => setUsuarios(json) )
        .catch(err => setError(true))
  }

  useEffect(() => {
    getUsuarios();
  }, [])

  return (
    <View >
      <View style={css.container}>
        <Image style={{width: "40%", height: 150, marginTop: 60, resizeMode: "contain"}} source={require("../../assets/usuariofix.png")}/>
        
      {usuarios.length > 0 ?
        <>
        
          <FlatList
            data={usuarios}
            renderItem={({ item }) => <Usuarios  style={css.nome} nome={item.usuarioNome}/>}
            keyExtractor={(item) => item.usuarioId}
            contentContainerStyle={{ height: (usuarios.length * 600) + 110 }}
          />
        </>
        :
        ( usuarios.length == 0 ? 
            <Text style={css.text}>Sem usuarios para exibir</Text>
          :
            <ActivityIndicator size="large" color="#3097ff" />
        )
      }
  </View>
    </View>
    
  )
  
}
const css = StyleSheet.create({
    container: {
    flexGrow: 1,
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white"
    },
    img: {
        width: "50%",
        height: 150,
        marginTop: -500,
        resizeMode: "contain",
    },
    textprincipal: {
        marginTop: 20
    },
    texto:{
        marginRight: 90,
    },
    nome: {
        color:"black"
    }
})