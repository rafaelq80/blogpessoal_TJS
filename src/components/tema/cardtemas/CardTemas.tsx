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
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Tema
            </header>

            {/* 
                Como a propriedade descricao é um campo dinâmico (cada renderização do Componente
                CardTemas receberá um valor diferente), inserimos na tag de paragrafo (`<p></p>`) 
                a propriedade descricao do Objeto tema, que foi enviado como uma propriedade (**Props**) 
                para o Componente CardTema.
            */}
            <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>

            <div className="flex">

                 {/* 
                    Envolvemos os Botões Editar e Deletar com o Componente Link e adicionamos 
                    as rotas para os respectivos componentes. 
                    Observe que na construção das rotas utilizamos a interpolação de strings
                    adicionando a rota seguida do id do tema, para identificar qual tema será 
                    Editado ou Deletado.
                */}
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
		                        flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTemas