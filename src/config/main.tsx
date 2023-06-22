import { useRouter } from 'next/router'

export function Idade() {
    const today = new Date();
    const birthDate = new Date("2004/09/02");
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

export class Router{
    Pathname(){

        const router = useRouter()
        return router.asPath
    }
}
