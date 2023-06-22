import { useState } from "react";

interface Props{
    linguagem: string;
    arquivo: string;
    colorStroke: string;
    color: string;
  }

  export default function CardTecnologia({linguagem, arquivo,colorStroke, color}: Props ){
    const [flip, setFlip] = useState(false)

    function handleFlip() {
      setFlip(!flip)
    }

    return(
      <div className='!w-auto h-auto'> 
        <div className={`card ${flip ? "flip" : null} mx-4`} onClick={handleFlip}>
          <div className={`face ${color}`}>
            <div className=" inset-1 bg-gray-900 z-10 absolute rounded">
              <div className="h-48">
              <div className="relative top-5 left-10 w-full">
                <svg className="w-full">
                  <circle cx="75" cy="75" r="70" className="fill-none stroke-black stroke-5"></circle>
                  <circle cx="75" cy="75" r="70" className={`${colorStroke} fill-none stroke-5`} ></circle>
                </svg>
              </div>
              <figure className="relative w-16 -top-[5.2rem] left-[5.2rem]">
                  <img src={`/linguagens/${arquivo}.svg`} alt={`Icone ${linguagem}`} />
              </figure>
              </div>
              <p className="text-white w-full text-center font-medium">{linguagem}</p>
            </div>
          </div>
        <div className="face back">
          <i className="fa-solid fa-code text-3xl"></i>
        </div>
        </div>
      </div>
       
    )
}
