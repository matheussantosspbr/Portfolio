import CardTecnologia from "../components/CardTecnologia"

export default function Tecnologias() {
    document.title = 'Início'
    return (

                <section className='flex mt-8 !w-full items-center justify-center mb-8 flex-col pl-8 pr-8 xs:pl-0 xs:pr-0'>
                    <h2 className='text-2xl text-white font-semibold  '>Tecnologias</h2>
                    <p className="text-white mb-8 text-md">Clique nos cards.</p>
                    <div className='!w-full flex flex-wrap items-center justify-center'>
                        <CardTecnologia linguagem='HTML' arquivo='html' color='front-HTML' colorStroke='stroke-linguagens-html' alt='Icone HTML'/>
                        <CardTecnologia linguagem='CSS'  arquivo='css'  color='front-CSS' colorStroke='stroke-linguagens-css' alt='Icone CSS'/>
                        <CardTecnologia linguagem='JavaScript' arquivo='js' color='front-JavaScript' colorStroke='stroke-linguagens-js' alt='Icone JavaScript'/>
                        <CardTecnologia linguagem='React' arquivo='react' color='front-React' colorStroke='stroke-linguagens-react' alt='Icone React'/>
                        <CardTecnologia linguagem='TailWindCSS' arquivo='tailwindcss' color='front-TailWindCSS' colorStroke='stroke-linguagens-tailwindcss' alt='Icone TailWindCSS'/>
                        <CardTecnologia linguagem='PHP' arquivo='php' color='front-PHP' colorStroke='stroke-linguagens-php' alt='Icone PHP'/>
                        <CardTecnologia linguagem='Laravel' arquivo='laravel' color='front-Laravel' colorStroke='stroke-linguagens-laravel' alt='Icone Laravel'/>
                        <CardTecnologia linguagem='PostgreSQL' arquivo='postgreSql' color='front-PostgreSQL' colorStroke='stroke-linguagens-postgreSQl' alt='Icone PostgreSQL'/>  
                    </div>
                </section>

    )
  }