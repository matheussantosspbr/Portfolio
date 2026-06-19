interface Props{
    placeholder: string;
    width: string;
    nome: string;
    cols?:number;
    rows?:number;
    add?:string;
  }

export default function TextArea({placeholder,nome,width, cols = 30, rows = 10, add}: Props ){


    return(
        <textarea name={nome} id="" cols={cols} rows={rows} placeholder={placeholder} className={`
        bg-gray-900
        border-2
        border-cyan-500
        pt-1 pb-1
        pl-2
        pr-2
        mb-2
        text-white
        outline-none
        rounded-md
        text-sm
        ${width}
        ${add}
    `} required></textarea>
    )
}