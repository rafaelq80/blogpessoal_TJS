import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='flex flex-col justify-between border-slate-900 border rounded overflow-hidden'>

            <div>
                <div className="flex items-center gap-4 bg-indigo-400 px-4 py-2 w-full">
                    <img
                        src={postagem.usuario?.foto}
                        className='rounded-full h-12'
                        alt={postagem.usuario?.nome} />
                    <h3 className='font-bold text-center text-lg uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4'>
                    <h4 className='font-semibold text-lg uppercase'>{postagem.titulo}</h4>
                    <p>{postagem.texto}</p>
                    <p>Tema: {postagem.tema?.descricao}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-800 py-2 w-full text-white'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
                    className='flex justify-center items-center bg-red-400 hover:bg-red-700 w-full text-white'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem