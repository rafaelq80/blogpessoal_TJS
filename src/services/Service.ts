import axios from "axios";

/**
 * Criamos uma instância da Biblioteca Axios, chamada api, através 
 * do método create(). Dentro do método, definimos um objeto de 
 * configuração, que possui a propriedade baseURL. Na propriedade 
 * baseURL, insira o Link do Deploy do Backend do seu Blog Pessoal.
 *  
 * Isso significa que todas as Requisições HTTP, efetuadas nesta 
 * instância do Axios, estarão acessando o endereço do Servidor, 
 * onde o seu deploy foi realizado, funcionando com um prefixo do 
 * endereço do endpoint, que você deseja consumir.
 * 
 *  **Exemplo**: 'https://blogpessoal.onrender.com/postagens'
 * 
 * onde:
 * 
 * - https://blogpessoal.onrender.com é o prefixo (Endereço do Deploy)
 * 
 * - /postagens é a URL do endpoint
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

/**
 * Criamos uma Arrow Function, que receberá três argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP POST. Essa URL será anexada à URL 
 *   base definida anteriormente na instância do Axios (baseURL).
 * 
 * - dados: Estado que representa os dados do usuário propriamente ditos, 
 *   que serão enviados no Corpo da Requisição POST e serão persistidos no 
 *   Banco de dados do Backend.
 * 
 * - setDados: É a função que será utilizada para atualizar o Estado 
 *   usuario, que será utilizado para enviar os dados, que serão 
 *   persistidos no Banco de dados do Backend, com os dados recebidos 
 *   no Corpo da Resposta da Requisição, confirmando a persistência 
 *   dos dados do usuário. A principal alteração que será feita neste 
 *   Estado é a inclusão do id, que foi gerado pelo Banco de dados.
 * 
 * Para enviar a Requisição POST, utilizaremos o método api.post() do Axios.
 */
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

/**
 * Criamos uma Arrow Function, que receberá três argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP POST (Login). Essa URL será 
 *   anexada à URL base definida anteriormente na instância do 
 *   Axios (baseURL).
 * 
 * - dados: O Estado usuarioLogin, que representa os dados que o usuário
 *   utilizará para se autenticar (logar), no Backend (usuário e senha), 
 *   que serão enviados no Corpo da Requisição POST e serão validados 
 *   no Backend.
 * 
 * - setDados: É a função que será utilizada para atualizar o Estado 
 *   usuario, que foi criado na Context (AuthContext), que será 
 *   utilizado para armazenar os dados do usuário autenticado no Backend,
 *   recebidos no Corpo da Resposta da Requisição Login, confirmando 
 *   a autenticação do usuário. A principal alteração que será feita no 
 *   Estado usuario é a inclusão de todos os dados do usuario como id, nome, 
 *   foto e o token.
 * 
 * Para enviar a Requisição POST, utilizaremos o método api.post() do Axios.
 */
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

/**
 * Criamos uma Arrow Function, que receberá três argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP GET. Essa URL será anexada à URL 
 *   base definida anteriormente na instância do Axios (baseURL).
 * 
 * - setDados: É a função que será utilizada para atualizar o Estado,
 *   que recebrá os dados enviados pelo Backend no corpo da resposta
 *   da Requisição HTTP. Este Estado, pode ser um único objeto ou um array, 
 *   que armazenará vários objetos.
 * 
 * - header: É um objeto que contém o Cabeçalho da Requisição HTTP(Header). 
 *   Nós o utilizaremos para enviar o Token de Autenticação no Cabeçalho 
 *   da Requisição HTTP.
 * 
 * Para enviar a Requisição GET, utilizaremos o método api.get() do Axios.
 */
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

/**
 * Criamos uma Arrow Function, que receberá quatro argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP POST. Essa URL será anexada à URL 
 *   base definida anteriormente na instância do Axios (baseURL).
 * 
 * - dados: Estado que representa os dados propriamente ditos, que serão 
 *   enviados no Corpo da Requisição POST e serão persistidos no 
 *   Banco de dados do Backend.
 * 
 * - setDados: É a função que será utilizada para atualizar o Estado,
 *   que será utilizado para enviar os dados, que serão persistidos 
 *   no Banco de dados do Backend, com os dados recebidos no Corpo 
 *   da Resposta da Requisição, confirmando a persistência dos dados. 
 *   A principal alteração que será feita neste Estado é a inclusão 
 *   do id, que foi gerado pelo Banco de dados.
 * 
 * - header: É um objeto que contém o Cabeçalho da Requisição HTTP(Header). 
 *   Nós o utilizaremos para enviar o Token de Autenticação no Cabeçalho 
 *   da Requisição HTTP.
 * 
 * Para enviar a Requisição POST, utilizaremos o método api.post() do Axios.
 */
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

/**
 * Criamos uma Arrow Function, que receberá quatro argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP PUT. Essa URL será anexada à URL 
 *   base definida anteriormente na instância do Axios (baseURL).
 * 
 * - dados: Estado que representa os dados propriamente ditos, que serão 
 *   enviados no Corpo da Requisição PUT e serão utilizados para atualizar 
 *   os dados de um objeto anteriormente persistido no Banco de dados 
 *   do Backend.
 * 
 * - setDados: É a função que será utilizada para atualizar o Estado, 
 *   que será utilizado para enviar os dados, que serão utilizados na 
 *   atualização dos dados de um objeto anteriormente persistido no 
 *   Banco de dados do Backend, com os dados recebidos no Corpo da 
 *   Resposta da Requisição, confirmando a atualização dos dados.
 * 
 * - header: É um objeto que contém o Cabeçalho da Requisição HTTP(Header). 
 *   Nós o utilizaremos para enviar o Token de Autenticação no Cabeçalho 
 *   da Requisição HTTP.
 * 
 * Para enviar a Requisição PUT, utilizaremos o método api.put() do Axios.
 */
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

/**
 * Criamos uma Arrow Function, que receberá quatro argumentos:
 * 
 * - url: É uma string que representa o endereço do endpoint da API, 
 *   que receberá a Requisição HTTP DELETE. Essa URL será anexada à URL 
 *   base definida anteriormente na instância do Axios (baseURL).
 *   Na Requisição DELETE, enviaremos o id do Objeto que será excluído
 *   através da URL.
 * 
 * - header: É um objeto que contém o Cabeçalho da Requisição HTTP(Header). 
 *   Nós o utilizaremos para enviar o Token de Autenticação no Cabeçalho 
 *   da Requisição HTTP.
 * 
 * Para enviar a Requisição DELETE, utilizaremos o método api.delete() do Axios.
 */
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}