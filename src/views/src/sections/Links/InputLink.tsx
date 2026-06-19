interface Props {
    title: string;
    link: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export default function InputLink({ title, type = 'PRIMARY',link}: Props ) {

return (
    <a href={link} className="border-2 border-cyan-500 rounded-full mb-4 p-4 w-60 hover:bg-cyan-500 text-white flex flex-col items-center justify-center shadow-center-md shadow-cyan-500 transition-colors
    duration-[0.2s]">
        {title}
    </a>
    
)
}