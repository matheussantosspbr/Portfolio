interface Props{
    url: string;
    title: string;
    alt: string;
    linguagens: string;
    link: string;
  }

export default function CardProjects({url, alt,title,linguagens, link }: Props ){

    let imgs = linguagens.split(",");

    const listItems = imgs.map((img) =>
        <figure className="w-14 m-2 mt-0 mb-4 border border-transparent rounded-md p-2 bg-gray-900-0.70">
            <img src={`/linguagens/${img}.svg`} alt={img} className="w-full"/>
        </figure>
    );


    return(
        <a href={link} className='h-108 w-72 p-3 pt-9  flex items-center justify-start flex-col ml-5 mr-5 mb-8 cardProjects'>
            <figure className="mb-2">
                <img src={`/projetos/${url}`} alt={alt} className='w-48 rounded-md'/>
            </figure>
            <div className="mb-4">
                <p className="text-xl mt-2 text-white ">{title}</p>
            </div>
            <div className="flex items-center justify-center flex-wrap ">
                {listItems}
            </div>
        </a>
    )
}