import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {   
    const [logado, setLogado] = useState(true);
    const [error, setError] = useState(false);
    const [cadastro, setCadastro] = useState(false);

    async function Login(email, senha) {
        if (email && senha) {
            await fetch('http://10.139.75.101:5251/api/Usuarios/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UsuarioEmail: email,
                    UsuarioSenha: senha,
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                setLogado(json ? true : false);
                setError(!json);  
            })
            .catch((err) => {
                console.error("Erro ao realizar login:", err);
                setError(true);
            });
        } else {
            setError(true);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, Login, error, cadastro, setCadastro }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
