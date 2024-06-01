import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTemas from "../cardtemas/CardTemas";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {

    const navigate = useNavigate()

    /**
   * Criamos um estado chamado temas, do tipo Tema (Interface Model), 
   * através do Hook UseState, com todos os atributos da Interface Tema,
   * inicializados com o valor vazio ou zero, de acordo com as respectivas 
   * tipagens de cada atributo. 
   * Para modificar o valor do estado, foi criada a função setUsuario, 
   * seguindo a sintaxe básica do Hook useState.
   * 
   * O objetivo do estado usuario é armazenar os dados de todos os temas, 
   * que foram perisitidos no Backend. Observe que temas foi definido como
   * um Array.
   */
    const [temas, setTemas] = useState<Tema[]>([])

    /**
     * Estamos acessando o nosso contexto AuthContext através do hook 
     * useContext.
     * 
     * Note que desestruturamos as propriedades do Componente Context, 
     * tornando possível o uso individualizado das propriedades disponibilizadas 
     * pelo Componente AuthContext. Através da desestruturação foi possível 
     * selecionar apenas as propriedades usuario (usuário autenticado) e
     * handleLogout (Função de saída do sistema), e na sequência atribui-las 
     * a variáveis com o mesmo nome. 
     */
    const { usuario, handleLogout } = useContext(AuthContext)

    /**
     * Definimos uma constante chamada token e adicionamos a propriedade token 
     * do usuário autenticado, ou seja, o token de autenticação JWT gerado 
     * pelo Backend quando o usuário efetuou o Login.
     */
    const token = usuario.token

    /**
   * A função buscarTemas é responsável por realizar o processo de 
   * busca de todos os temas persistidos no Backend, atualizando 
   * o Estado temas com os resultados encontrados. 
   * Ela também lida com as Exceptions (Exceções), especificamente 
   * tratando erros de autenticação, alertando o usuário sobre a 
   * expiração do token e executando o logout, para que o usuário 
   * faça um novo login e receba um novo token de acesso.
   */
    async function buscarTemas() {

        /**
         * Dentro do bloco TRY, invocamos a função buscar(), do Script Service. 
         * Seguindo a sua estrutura, passamos como argumentos:
         * 
         * - A URL do endpoint de cadastro ('/temas'), definida no recurso Tema do Backend;
         * - A função setTema, que será utilizada para atualizar o Estado temas, 
         *   com os dados recebidos na Resposta da Requisição HTTP. 
         */
        try {
            await buscar(`/temas`, setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    /**
    * Adicionamos o Hook useEffect, que será executado sempre que houver 
    * uma mudança no tamanho (numero de elementos aramzenados) do estado temas.
    * 
    * Todas as vezes que ocorrer uma mudança no tamanho do estado usuario, 
    * a função buscarTemas() será executada para atualizar a listagem de temas. 
   */
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <>

        {/* 
            Utilizando a Renderização Condicional, através de um If Ternário, 
            sempre que o Estado temas estiver vazio (length === 0), será exibido 
            o Componente de Carregamento (loader) DNA, da Biblioteca React 
            Loader Spinner. 
        */}
            {
                temas.length === 0 && (
                    <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper mx-auto"
                    />
                )
            }

            < div className="flex justify-center w-full my-4" >
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">

                        {/* 
                            O método map é uma função JavaScript utilizada com arrays. 
                            Ela é usada para iterar sobre cada elemento de um array e 
                            aplicar uma transformação ou uma renderização de cada item. 
                            Em nosso projeto, criamos uma Arrow Function, que será responsável 
                            por enviar todos os temas, um de cada vez, para o Componente 
                            CardTemas, que se encarregará de gerar um novo Card para cada tema, 
                            com os seus respectivos dados.

                            O atributo key é usado para fornecer uma chave única 
                            (como se fosse uma Chave Primária) para cada Componente Card Renderizado, 
                            o que ajuda o React a otimizar o processo de renderização. Como o atributo
                            id do tema é um valor único e exclusivo, o adicionamos na propriedade key.

                            O atributo tema, receberá o argumento tema, definido na Arrow Function 
                            criada no método map. O argumento tema será usado pelo método map para 
                            selecionar os dados de cada objeto tema armazenado no Estado temas, um a um, 
                            como se fosse um Laço de Repetição. Na sequência, o tema selecionada será 
                            enviado na Prop (propriedade) tema do Componente CardTemas. Desta forma, 
                            será renderizado em tela um Componente CardTemas para cada objeto tema. 
                        */}
                        {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
export default ListaTemas;