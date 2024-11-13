import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';



import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Recomendacao from '../Pages/Recomendacao';
import Usuario from '../Pages/Usuario';
import Conexoes from '../Pages/Conexoes';
import Sobre from '../Pages/Sobre';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }} />
            <Stack.Screen name="Usuario" component={Usuario} options={{ title: 'Perfil do Usuário' }} />
            <Stack.Screen name="Conexoes" component={Conexoes} options={{ headerShown: false }} />
            <Stack.Screen name="Recomendacao" component={Recomendacao} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function Rotas() {
    const { logado, cadastro } = useContext(AuthContext);

  
    if (!logado && !cadastro) {
        return <Login />;
    }

    if (!logado && cadastro) {
        return <Cadastro />;
    }

    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
}