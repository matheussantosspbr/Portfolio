import ScrollToTop from "react-scroll-to-top" 

export default function ButtonTop(){
    return (
        <ScrollToTop className="flex items-center justify-center animate-bounce" 
        style={
            {
                background : '#0B0F13',
                width : '3.25rem',
                height : '3.25rem',
                boxShadow : 'none',
                border : '2px solid #00B8EB',
                borderRadius : '100%',
            }

    } color="#00B8EB" smooth/>
   )
}