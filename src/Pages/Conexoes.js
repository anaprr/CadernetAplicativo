import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

export default function Conexoes() {


    const [vacinas, setVacinas] = useState([]);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const keys = [ 1, 2, 3, 5, 6 ];


    async function getVacinas(event) {
        const { position } = event.nativeEvent;
        await fetch('http://10.139.75.101:5251/api/Vacinas/GetVacinasIdade/' )
            .then(res => res.json())
            .then(json => {
                setVacinas(json);
            })
            .catch(err => setError(true))
    }

    useFocusEffect(
        React.useCallback(() => {
            //  getVacinas(1);
        }, [])
    );

  return (
    <View style={styles.container}>
    <View style={styles.caixatop}>
        <Image style={styles.logo} source={require('../../assets/IconeLogoCadernet.png')} />
        <Text style={{ textAlign: 'center', marginTop: 35 }}>
                Observe as experiencias de outros pacientes com a vacina.
        </Text>
    </View>
    <View style={styles.container} >
        <View style={styles.page} key="1">
            <View style={styles.caixa1}>
                <Image style={styles.imagem1} source={{ uri: 'https://images.vexels.com/content/284336/preview/baby-cookie-people-fcc836.png' }} />
                <Text style={{ marginTop: 30 }}>0-10 anos</Text>
            </View>
            {vacinas ?
                <View style={styles.vacinalista}>
                    <FlatList
                        data={vacinas}
                        keyExtractor={(item) => item.vacinaId.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.caixavacina}>
                                <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                            </View>
                        )}
                    />
                </View>
                :
                <ActivityIndicator size="large" />
            }
        </View>
        
     


    </View>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',


    },
    caixatop: {
        alignItems: 'center',
        textAlign: 'center'
    },
    logo: {
        width: 30,
        height: 40,
        marginTop: 30
    },

    page: {
        alignItems: 'center',

    },
    caixa1: {

        width: 160,
        height: 190,
        borderRadius: 15,
        marginTop: 40,
        alignItems: 'center'

    },
    imagem1: {
        width: 140,
        height: 170,

    },
    caixavacina: {
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row',
        backgroundColor: '#A9DDFF',
        opacity: 0.5,
        width: 350,
        height: 50,
        borderRadius: 15,
    },

});