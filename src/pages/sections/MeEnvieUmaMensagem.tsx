import FormContato from "../components/Form"

export default function MeEnvieUmaMensagem() {
    return (

        <section className='mt-8 w-full flex items-center flex-col justify-center pl-8 pr-8'>
            <h2 className='text-2xl text-white font-semibold mb-8'>Me Mande Uma Mensagem 😉</h2>
            <FormContato/>
        </section>

    )
  }