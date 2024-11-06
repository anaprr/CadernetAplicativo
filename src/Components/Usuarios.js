import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Usuarios({nome, historico,pendente}) {
  return (
    <View>
         <Text style={css.texto}>{nome}</Text>
         <Text style={css.texto}>{historico}</Text>
         <Text style={css.texto}>{pendente}</Text>
    </View>
  )
}
const css = StyleSheet.create({
  container: {
      flexGrow: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "white"
  },
})