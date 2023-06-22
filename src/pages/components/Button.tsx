import Link from 'next/link';

interface Props{
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
    width : string;
    add ?: string;
    url ?: string;
  }

export default function Button({ title, type = 'PRIMARY',width, add, url = ""}: Props ){

    let bgColor = type == 'PRIMARY' ? 'bg-gray-900' : 'bg-cyan-500' ;
    let borderColor = type == 'PRIMARY' ? 'border-cyan-500' : 'border-gray-900' ;
    let hover = type == 'PRIMARY' ?  'hover:bg-cyan-500'  :  'hover:bg-gray-900';

    return (
        
        <Link href={url} aria-label={title} className={`
            ${width}
            rounded-3xl
            h-10
        `}>
            <button className={
            `
            ${width}
            ${bgColor}
            h-10
            rounded-3xl
            border-2
            transition-colors
            duration-[0.2s]
            ${borderColor}
            text-white
            text-base
            ${hover}
            ${add}
            `
            }>
            {title}
        </button>
        </Link>
    )
}