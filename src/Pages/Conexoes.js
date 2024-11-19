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
            const response = await fetch('http://10.139.75.53:5251/api/Vacinas/GetAllVacinas');
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

    // Função para calcular a média da dor e convertê-la em porcentagem, limitando o máximo a 100%
    const calcularPorcentagemMediaDor = (avaliacoes) => {
        if (avaliacoes.length === 0) return 'N/A';
        
        const somaDor = avaliacoes.reduce((acc, curr) => acc + curr.avaliacaoDor, 0);
        const mediaDor = somaDor / avaliacoes.length;
        const maxDor = 10; // Valor máximo esperado para avaliacaoDor (ajuste conforme necessário)
        
        // Verifica se todas as avaliações são 10, caso contrário, não permite 100%
        const todasNotas10 = avaliacoes.every(a => a.avaliacaoDor === 10);

        // Se todas as notas forem 10, a média pode ser 100%, senão, limita abaixo de 100%
        const porcentagemDor = todasNotas10 ? 10 : (mediaDor / maxDor) * 100;
        
        return `${Math.min(porcentagemDor, 100).toFixed(0)}%`; // Garante que o valor nunca ultrapasse 100%
    };

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
                                        <View>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Média de dor: {calcularPorcentagemMediaDor(avaliacoesFiltradas)}
                                            </Text>
                                            <FlatList
                                                data={avaliacoesFiltradas}
                                                keyExtractor={(avaliacaoItem) => avaliacaoItem.avaliacaoId.toString()}
                                                renderItem={({ item: avaliacaoItem }) => (
                                                    <View>
                                                        <Text style={{ fontWeight: 'bold' }}>
                                                            Nível de dor individual: {avaliacaoItem.avaliacaoDor}
                                                        </Text>
                                                    </View>
                                                )}
                                            />
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
