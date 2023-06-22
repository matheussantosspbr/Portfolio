import { useState } from "react"
import emailJs from '@emailjs/browser'


export default function FormContato() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    
    const publicToken = ( process.env.NEXT_PUBLIC_TOKEN_EMAILJS || '').toString()
    const template = (process.env.NEXT_PUBLIC_TEMPLATE_EMAILJS || '').toString()
    const service = (process.env.NEXT_PUBLIC_SERVICE_EMAILJS || '').toString()

    function sendEmail(e: { preventDefault: () => void }){
        e.preventDefault()
        
        const templalteParams = {
            from_name:name,
            message: message,
            email:email
        }
        emailJs.send(service, template, templalteParams, publicToken)
        .then((res)=>{
            location.reload()
            setName('')
            setEmail('')
            setMessage('')
        },(err)=>{
            location.reload()
        })
    }

    return (
        <form onSubmit={sendEmail} className='flex flex-col items-start justify-center' >
            <input type="text" placeholder="Digite seu nome" onChange={(e)=>setName(e.target.value)} value={name} minLength={5}
            className="
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
                w-[30rem]
                md:w-[calc(90vw)]"
            required/>
            <input type="email" placeholder="Digite seu email" onChange={(e)=>setEmail(e.target.value)} value={email} 
            className="
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
                w-[30rem]
                md:w-[calc(90vw)]"
            required/>
            <textarea placeholder="Digite sua mensagem" onChange={(e)=>setMessage(e.target.value)} value={message} rows={15} cols={30}
            className="
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
            w-[30rem]
            md:w-[calc(90vw)]"
            required></textarea>
            <input type="submit" value="Enviar mensagem" className='h-10 rounded-3xl border-2 text-white text-base pl-4 pr-4 bg-gray-900 border-cyan-500 hover:bg-cyan-500 transition-colors duration-[0.2s]'/>

        </form>

      
    )
  }