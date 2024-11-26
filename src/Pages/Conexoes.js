import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Conexoes() {
    const [vacinas, setVacinas] = useState([]);
    const [avaliacao, setAvaliacao] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [exibeId, setExibeId] = useState(null);
    const navigation = useNavigation();

    async function getVacinas() {
        setLoading(true);
        try {
            const response = await fetch('http://10.139.75.47:5251/api/Vacinas/GetAllVacinas');
            const data = await response.json();
            setVacinas(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVacinas();
    }, []);

    async function getAvaliacao() {
        setLoading(true);
        try {
            const response = await fetch('http://10.139.75.53:5251/api/Avaliacaos/GetAllAvaliacaos');
            const data = await response.json();
            setAvaliacao(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAvaliacao();
    }, []);

    const FuncionaDetalhe = (vacinaId) => {
        setExibeId((prevId) => (prevId === vacinaId ? null : vacinaId));
    };


    function calcularMedia(avaliacoes) {
        if (!avaliacoes || avaliacoes.length === 0) return 0; 
    

        const soma = avaliacoes.reduce((acc, curr) => {
            const valor = parseInt(curr.avaliacaoDor, 10); 
            return !isNaN(valor) ? acc + valor : acc; 
        }, 0);
    
        return Math.floor(soma / avaliacoes.length); 
    }

    function calcularMediaEfeitoColateral(avaliacoes) {
        if (!avaliacoes || avaliacoes.length === 0) return 0;
    
        const soma = avaliacoes.reduce((acc, curr) => {
            const valor = parseInt(curr.avaliacaoEfeitoColateral, 10); 
            return !isNaN(valor) ? acc + valor : acc;
        }, 0);
    
        return Math.floor(soma / avaliacoes.length); 
    }

    function calcularMediaVezesTeveDoença(avaliacoes) {
        if (!avaliacoes || avaliacoes.length === 0) return 0;
    
        const soma = avaliacoes.reduce((acc, curr) => {
            const valor = parseInt(curr.avaliacaoVezesTeveDoença, 10); 
            return !isNaN(valor) ? acc + valor : acc;
        }, 0);
    
        return Math.floor(soma / avaliacoes.length); 
    }

    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.caixatop} onPress={() => navigation.navigate('Home')}>
                <Image style={styles.logo} source={require('../../assets/logoApp.png')} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: 0, fontSize: 15, fontStyle: "italic" }}>
                Observe as experiências de outros pacientes com a vacina.
            </Text>

            <View style={{ alignItems: "center", marginTop: 20 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#079EFF" />
                ) : error ? (
                    <Text style={{ color: 'red' }}>Erro ao carregar as vacinas. Tente novamente!</Text>
                ) : (
                    <FlatList
                        data={vacinas}
                        keyExtractor={(item) => item.vacinaId.toString()}
                        renderItem={({ item }) => {
                            const avaliacoesFiltradas = avaliacao.filter(a => a.vacinaId === item.vacinaId);
                            return (
                                <View>
                                    <View style={{
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 15,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        backgroundColor: '#A9DDFF',
                                        opacity: 0.5,
                                        width: 350,
                                        height: 50,
                                        borderRadius: 15,
                                        paddingHorizontal: 20
                                    }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                                            {item.vacinaNome}
                                        </Text>
                                        <TouchableOpacity onPress={() => FuncionaDetalhe(item.vacinaId)}>
                                            <Text style={{ color: '#079EFF', fontWeight: 'bold' }}>
                                                {exibeId === item.vacinaId ? 'Fechar Detalhes' : 'Detalhes'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {exibeId === item.vacinaId && (
                                        <View style={{ textAlign: 'center', width: 300}}>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                {Math.min(calcularMedia(avaliacoesFiltradas) * 10, 100)}% dos pacientes sentiram dores ao tomar essa vacina.
                                            </Text>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                
                                                 {Math.min(calcularMediaEfeitoColateral(avaliacoesFiltradas) * 10, 100)}% dos pacientes sentiram efeitos colaterais ao tomar essa vacina.
                                            </Text>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                
                                                {Math.min(calcularMediaVezesTeveDoença(avaliacoesFiltradas) * 10, 100)}% dos pacientes contrairam a doença após tomar essa vacina.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        }}
                    />
                )}
            </View>
        </View>
    );
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
        width: 300,
        height: 100,
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
    detalhes:{
        fontWeight: "bold", 
        marginTop: 0,
        
    }
});
