import CardTecnologia from "../components/CardTecnologia"

export default function Tecnologias() {
    return (

                <section className='flex mt-8 !w-full items-center justify-center mb-8 flex-col pl-8 pr-8 xs:pl-0 xs:pr-0'>
                    <h2 className='text-2xl text-white font-semibold'>Tecnologias</h2>
                    <p className="text-white mb-8 text-md">Clique nos cards.</p>
                    <div className='!w-full flex flex-wrap items-center justify-center'>
                        <CardTecnologia linguagem='HTML' arquivo='html' color='front-HTML' colorStroke='stroke-linguagens-html'/>
                        <CardTecnologia linguagem='CSS'  arquivo='css'  color='front-CSS' colorStroke='stroke-linguagens-css'/>
                        <CardTecnologia linguagem='JavaScript' arquivo='js' color='front-JavaScript' colorStroke='stroke-linguagens-js'/>
                        <CardTecnologia linguagem='React' arquivo='react' color='front-React' colorStroke='stroke-linguagens-react'/>
                        <CardTecnologia linguagem='TailWindCSS' arquivo='tailwindcss' color='front-TailWindCSS' colorStroke='stroke-linguagens-tailwindcss'/>
                        <CardTecnologia linguagem='PHP' arquivo='php' color='front-PHP' colorStroke='stroke-linguagens-php'/>
                        <CardTecnologia linguagem='Laravel' arquivo='laravel' color='front-Laravel' colorStroke='stroke-linguagens-laravel'/>
                        <CardTecnologia linguagem='PostgreSQL' arquivo='postgreSql' color='front-PostgreSQL' colorStroke='stroke-linguagens-postgreSQl' />
                        <CardTecnologia linguagem='NextJS' arquivo='nextjs' color='front-NextJS' colorStroke='stroke-linguagens-nextJS' />  
                    </div>
                </section>

    )
  }