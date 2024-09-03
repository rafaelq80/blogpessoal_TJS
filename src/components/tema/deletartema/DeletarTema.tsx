import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

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

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/temas')
    }

    /**
     * Criamos a função deletarTema, responsável por deletar 
     * um tema da aplicação (DELETE).
     */
    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlerta('O Tema foi apagado com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else{
                ToastAlerta('Erro ao Excluir o Tema!', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className='mx-auto w-1/3 container'>
            <h1 className='my-4 text-4xl text-center'>Deletar tema</h1>
            <p className='mb-4 font-semibold text-center'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
                <header 
                    className='bg-indigo-600 px-6 py-2 font-bold text-2xl text-white'>
                    Tema
                </header>
                <p className='bg-slate-200 p-8 h-full text-3xl'>{tema.descricao}</p>
                <div className="flex">
                    <button 
                        className='bg-red-400 hover:bg-red-600 py-2 w-full text-slate-100'
                        onClick={retornar}
                        >
                        Não
                    </button>
                    <button 
                        className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-600 w-full text-slate-100'
                        onClick={deletarTema}
                        >
                        {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>Sim</span>
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema