import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <div className='mx-auto w-1/3 container'>
            <h1 className='my-4 text-4xl text-center'>Deletar Postagem</h1>

            <p className='mb-4 font-semibold text-center'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
                <header 
                    className='bg-indigo-600 px-6 py-2 font-bold text-2xl text-white'>
                    Postagem
                </header>
                <div className="p-4">
                    <p className='h-full text-xl'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button 
                        className='bg-red-400 hover:bg-red-600 py-2 w-full text-slate-100'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-600 w-full text-slate-100'
                        onClick={deletarPostagem}>
                        
                        {isLoading ?
                            <RotatingLines
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

export default DeletarPostagem