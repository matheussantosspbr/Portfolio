/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          '900' : '#0B0F13',
          '900-0.70': 'rgba(0, 0, 0, 0.50)'
        },
        cyan:{
          '500': '#00B8EB '
        },
        linguagens:{
          'html': '#ef652a',
          'css' : '#33A9DC',
          'js': '#F7DF1E',
          'php': '#6e81b6',
          'postgreSQl': '#336791',
          'react': '#00d8ff',
          'laravel' : '#FF2D20',
          'tailwindcss' : '#07B6D5',
          'nextJS' : '#fff'
        },
        ferramentas:{
          'photoshop': '#00C8FF',
          'vsCode': '#007ACC',
          'github': '#fff',
          'git' : '#F05133'
        }
      },
      boxShadow: {
        'lg-top': '  0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'center': '  0 0px 10px 7px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'center-md': '  0 0px 10px 1px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'lg-inner': ' inset 0 20px 30px 0 rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
        'left': '  -5px 0 30px 20px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      backgroundImage:{
        galaxy: "url('/fundo_cabecalho.avif')",
      },
      backgroundSize: {
        'size-25': '25rem',
      },
      height:{
        '108': '28rem'
      },
      strokeWidth: {
        '5': '5px',
      },
      screens: {
        'xl': {'max': '1300px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '950px'},
        // => @media (max-width: 1023px) { ... }

        'xmd': {'max': '768px'},
  
        'md': {'max': '550px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '450px'},
        // => @media (max-width: 639px) { ... }
        'xs': {'max': '350px'},

      },
      textShadow: {
        'default': '0 2px 0 #000',
        'md': '0 2px 2px #000',
        'h2': '5px 5px 5px #000',
        'h1': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
     }
      
    },
  },
  plugins: [],
}
