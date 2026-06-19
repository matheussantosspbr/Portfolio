interface Props{
    placeholder: string;
    width: string;
    nome: string;
    type: 'text' | 'email' | 'password';
    add?:string;
  }

export default function InputText({placeholder,nome,width,type,add}: Props ){


    return(
        <input type={type} name={nome} placeholder={placeholder} className={`
            bg-gray-900
            border-2
            border-cyan-500
            pt-2 pb-2
            pl-2 pr-2
            mb-2
            h-10
            text-white
            outline-none
            rounded-md
            text-sm
            ${width}
            ${add}
        `}/>
    )
}