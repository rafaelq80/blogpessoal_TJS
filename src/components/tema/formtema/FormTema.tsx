import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    /**
     * Acessamos o parâmetro id, enviado dentro da URL da rota editartema, 
     * através do Hook useParams.
     * 
     * A variável id, estará presente na URL da rota do Componente FormTema, 
     * sempre que o usuário clicar no botão Editar, de qualquer um dos Cards 
     * do Componente ListaTemas, indicando uma atualização nos dados de um tema. 
     * 
     * O Hook useParams, da Biblioteca React Router DOM possui 2 parâmetros:
     * 
     * const { id }: Usando a desestruturação de objetos, extraímos o valor do 
     * parâmetro "id" da URL e atribuimos à variável id. O { id } corresponde 
     * ao nome do parâmetro que será acessado.
     * 
     * useParams<{ id: string }>(): Utilizamos o Hook useParams, para acessar 
     * o parâmetro id, na URL da rota. Observe que o parâmetro id, foi tipado 
     * como string, porque a URL é uma string.
     */
    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
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
     * Este useEffect executará a função buscarPorId(id), sempre que 
     * o valor da variável id for modificado. Na prática, todas as 
     * vezes que o usuário clicar no botão Editar de qualquer CardTemas,
     * o id do tema será passado na URL da rota, caracterizando uma 
     * mudança no valor da variável id, executando a função buscarPorId(id). 
     * Os dados obtidos na Resposta da Requisição, serão utilizados para 
     * preencher os campos do Fomulário Tema, no modo Editar Tema.
     */
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/temas')
    }

    /**
     * Criamos a função gerarNovoTema, responsável por criar e 
     * atualizar os temas da aplicação.
     * 
     * Atravás de um Laço Condicional, a função verificará se a 
     * variável id é diferente de undefined:
     * 
     * - Se for diferente de undefined, a função assume que se 
     *   trata da atualização de um tema existente (PUT). 
     * 
     * - Se não diferente de undefined, a função assume que se 
     *   trata da criação de um novo tema (POST).
     */
    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {

            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar o Tema!', 'erro')
                }
            }

        } else {

            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar o Tema!', 'erro')
                }
            }

        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">

                {/* 
                    Através de uma Expressão Ternária, utilizaremos a variável id 
                    para definir se o título do formulário será Cadastrar Tema ou 
                    Editar Tema, indicando os respectivos processos:
                    
                    - Se o id estiver com o valor undefined, exibiremos o texto 
                      Cadastrar Tema;
                    
                    - Caso contrário, exibiremos o texto Editar Tema.
                */}
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormTema;