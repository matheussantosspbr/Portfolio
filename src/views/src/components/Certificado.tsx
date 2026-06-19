interface Props{
    title: string;
    horas: string;
    url: string;
  }

export default function Certificado({ title, horas,url}: Props ) {
    return (
        <div className="flex p-4 h-72 w-full mb-8 bg-cyan-500 shadow-lg-inner shadow-gray-900 items-center justify-center lg:flex-col lg:h-[24rem] md:p-1">
            <figure className="w-[50%] pl-8 lg:p-0 lg:mb-2 lg:w-[100%] lg:flex lg:items-center lg:justify-center">
                <img src={`/certificados/${url}.avif`} alt={`${title} - [${horas}]`} className="rounded-md w-[17rem] sm:w-[13rem]"/>
            </figure>
            <div className="mr-8 w-[50%] pr-8 flex flex-col items-end lg:p-0  justify-center lg:m-0 lg:w-[100%]">
               <div className="lg:flex lg:flex-col lg:items-center lg:justify-center w-[100%]">
                    <h3 className="text-2xl text-center mb-4 text-white text-shadow-h2 font-semibold w-[100%] sm:text-xl ">{title}</h3>
                    <p className="text-2xl text-center text-white text-shadow-h2 font-semibold sm:text-xl">[{horas}]</p>
               </div>
            </div>
        </div>

      
    )
  }