import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ReactNode, useContext } from "react"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    /**
     * Cria a constante navigate, que receberá o Hook useNavigate().
     * Através da constante navigate, o usuário será redirecionado 
     * para outras rotas da aplicação, conforme a necessidade.
     */
    const navigate = useNavigate()

    /**
     * Criamos uma desestruturação para receber a função handleLogout(), 
     * disponível na Context AuthContext, através do Hook useContext(). 
     */
    const { usuario, handleLogout } = useContext(AuthContext)

    /**
     * Criamos a função logout(), que será responsável por efetuar 
     * o processo de logout do usuário. A função logout() executa a 
     * função handleLogout() da Context AuthContext, responsável por 
     * reiniciar os dados do usuário no contexto da aplicação, ou seja, 
     * retornando para o Estado inicial. 
     * 
     * Na sequência, será exibido um alerta para informar o usuário que 
     * o logout foi efetuado com sucesso e redireciona o usuário para a 
     * Página de Login, através da constante navigate. 
     */
    function logout() {
        handleLogout()
        ToastAlerta('O usuário foi desconectado com sucesso!', "info")
        navigate('/')
    }

    let component: ReactNode;

    if (usuario.token !== "") {

        component = (
            <div className='flex justify-center bg-indigo-900 py-4 w-full text-white'>

                <div className="flex justify-between text-lg container">
                    <Link to="/home" className="font-bold text-2xl">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>

                        {/* 
                        Envolvemos o texto Sair com o Componente Link e adicionamos 
                        o evento onClick para executar a função logout(). 
                        Também adicionamos a classe hover:underline do Tailwind, para 
                        criar o efeito underline ao passar o mouse sobre o texto Sair. 
                    */}
                        <Link to="" onClick={logout} className="hover:underline">Sair</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Navbar