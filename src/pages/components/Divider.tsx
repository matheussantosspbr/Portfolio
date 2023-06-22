interface Props{
    type?: 'PRIMARY' | 'SECONDARY';
  }

export default function Divider({type = 'PRIMARY' }: Props ){
    let from = type == 'PRIMARY' ? 'from-cyan-500' : 'from-gray-900';
    let to = type == 'PRIMARY' ? 'to-gray-900' : 'to-cyan-500';
    return(
        <div className={`
        bg-gradient-to-l
        ${from}
        ${to}
        h-[1px]
        w-full
        `}></div>
    )
}