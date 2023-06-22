import CardTecnologia from "../components/CardTecnologia"

export default function Ferramentas() {
    return (

        <section className='flex mt-8 items-center justify-center mb-8 flex-col pl-8 pr-8 xs:pl-0 xs:pr-0'>
            <h2 className='text-2xl text-white font-semibold'>Ferramentas</h2>
            <p className="text-white mb-8 text-md">Clique nos cards.</p>
            <div className='flex flex-wrap items-center justify-center'>
                <CardTecnologia linguagem='Photoshop' arquivo='photoshop' color='front-Photoshop' colorStroke='stroke-ferramentas-photoshop' alt='Icone Photoshop'/>
                <CardTecnologia linguagem='Visual Studio Code'  arquivo='vsCode'  color='front-VSCode' colorStroke='stroke-ferramentas-vsCode' alt='Icone Vs Code'/>
                <CardTecnologia linguagem='Github' arquivo='github' color='front-Github' colorStroke='stroke-ferramentas-github' alt='Icone Github'/>
                <CardTecnologia linguagem='Git' arquivo='git' color='front-Git' colorStroke='stroke-ferramentas-git' alt='Icone Git'/>
            </div>
        </section>

    )
  }