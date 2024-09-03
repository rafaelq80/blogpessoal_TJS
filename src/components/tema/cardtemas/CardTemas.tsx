import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

/**
 * Criamos uma interface CardTemasProps, que especifica todas as propriedades 
 * que o Componente CardTemas espera receber na forma de Props. 
 * A Interface é composta por um Objeto da Interface Model Tema, chamado tema. 
 */
interface CardTemasProps{
    tema: Tema
}

/**
 * Adicionamos a Interface CardTemaProps como Props do Componente 
 * (argumentos do Componente).
 */
function CardTemas({ tema }: CardTemasProps) {
    return (
        <div className='flex flex-col justify-between border rounded-2xl overflow-hidden'>
            <header className='bg-indigo-800 px-6 py-2 font-bold text-2xl text-white'>
                Tema
            </header>

            {/* 
                Como a propriedade descricao é um campo dinâmico (cada renderização do Componente
                CardTemas receberá um valor diferente), inserimos na tag de paragrafo (`<p></p>`) 
                a propriedade descricao do Objeto tema, que foi enviado como uma propriedade (**Props**) 
                para o Componente CardTema.
            */}
            <p className='bg-slate-200 p-8 h-full text-3xl'>{tema.descricao}</p>

            <div className="flex">

                 {/* 
                    Envolvemos os Botões Editar e Deletar com o Componente Link e adicionamos 
                    as rotas para os respectivos componentes. 
                    Observe que na construção das rotas utilizamos a interpolação de strings
                    adicionando a rota seguida do id do tema, para identificar qual tema será 
                    Editado ou Deletado.
                */}
                <Link to={`/editartema/${tema.id}`}
                    className='flex justify-center items-center bg-indigo-400 hover:bg-indigo-800 py-2 w-full text-slate-100'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}
                    className='flex justify-center items-center bg-red-400 hover:bg-red-700 w-full text-slate-100'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTemas