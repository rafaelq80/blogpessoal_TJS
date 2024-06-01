import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

/**
 * Criamos a Interface AuthContextProps com as propriedades que serão 
 * compartilhadas com toda a aplicação. Lembrando que essa interface 
 * tem como responsabilidade definir a estrutura do nosso contexto, 
 * ou seja, quais Estados e Funções serão aramzenadas no contexto.* 
 */
interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
}

/**
 * Definimos a interface AuthProviderProps, que tem como responsabilidade 
 * definir a estrutura das propriedades do Componente Provedor (Provider). 
 * Ele tem uma única propriedade, chamada children, que é do tipo ReactNode, 
 * usado para encapsular e representar todos os componentes filhos da aplicação 
 * (Componentes inseridos no Componente App e os seus subcomponentes), 
 * que terão acesso ao contexto.
 */
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Esta é uma das linhas mais importantes da Context. 
 * É nesta linha que construímos e exportamos o contexto, indicando quais Estados 
 * e Funções estamos armazenando no contexto, em nosso projeto, será a Interface 
 * AuthContextProps.
 */
export const AuthContext = createContext({} as AuthContextProps)

/**
 * Definimos e exportamos o Componente AuthProvider. 
 * O Componente AuthProvider, é um Componente Funcional, que tem como responsabilidades 
 * gerenciar o contexto da aplicação, compartilhar o contexto, implementar as funções 
 * compartilhadas e atualizar os Estados compartilhados com toda a aplicação. 
 * Esse componente recebe como argumento a propriedade children, que é usado para envolver 
 * e representar todos os componentes filhos e seu subcomponentes, que terão acesso 
 * aos Estados e Funções mantidos na Context.
 */
export function AuthProvider({ children }: AuthProviderProps) {

    /**
     * Definimos um estado, chamada usuario, com a sua respectiva função 
     * de atualização do estado, chamada setUsuario, através do Hook useState. 
     * A variável de estado usuario será utilizada para armazenar as informações do 
     * usuário autenticado, após o mesmo efetuar o login na aplicação.
     */
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    /**
     * Definimos um estado chamado isLoading, do tipo boolean, através do 
     * Hook UseState, com o valor inicial false.  
     * Este estado será utilizado para armazenar uma valor do tipo boolean, 
     * auxiliando no processo de confirmação se uma determinada ação foi 
     * finalizada (false) ou não (true). 
     * Para atualizar o estado da variável isLoading, foi criada a 
     * função setIsLoading.
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * A função handleLogin() é responsável por realizar o processo de 
     * login do usuário na aplicação. 
     * Enquanto o processo de login está em andamento, a função exibe 
     * um indicador de carregamento (Loader), trata os erros do processo, 
     * exibe alertas de sucesso ou falha do processo e atualiza o Estado da aplicação, 
     * incluindo a atualização dos dados do Estado usuario após o login bem-sucedido.
     */
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
        } catch (error) {
            ToastAlerta("Dados do Usuário inconsistentes!", "erro");
        }
        
        setIsLoading(false);
    }

    /**
     * A função handleLogout() é utilizada para reiniciar o Estado usuario, 
     * definindo todas as suas propriedades com os valores padrão. 
     * Isso é comum em sistemas de autenticação para garantir que os dados 
     * do usuário não permaneçam acessíveis após o logout, obrigando que um 
     * novo login seja efetuado para acessar o sistema novamente.
     */
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })
    }

    /**
     * Renderiza o componente AuthProvider com o contexto definido. 
     * Ele fornece para a aplicação, através da propriedade value, 
     * todas as propriedades definidas na Interface AuthContextProps, 
     * que foram implementadas dentro da lógica do componente e mantidas no contexto.
     */
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}