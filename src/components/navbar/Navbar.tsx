import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                    <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        <Link to="/login" className="hover:underline">Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar