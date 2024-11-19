import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {   
    const [logado, setLogado] = useState(true);
    const [error, setError] = useState(false);
    const [cadastro, setCadastro] = useState(false);
    const [novaobs, setNovaobs ] = useState( false );
    const [ usuario, setUsuario ] = useState();


    async function Login(email, senha) {
        if (email && senha) {

            await fetch('http://10.139.75.53:5251/api/Usuarios/Login', {

                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioEmail: email,
                    usuarioSenha: senha
                })
            })
            .then( res => res.json())
            .then( json  => {
                if(json.usuarioId) {
                    setLogado( true );
                    setUsuario( json );
                } else {
                    setError( true );
                }
            } )
            .catch((err) => {
                console.error("Erro ao realizar login:", err);
                setError(true);
            });
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, Login, error, cadastro, setCadastro, novaobs: novaobs, setNovaobs, usuario: usuario  }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
