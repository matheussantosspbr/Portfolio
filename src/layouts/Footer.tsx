export default function Footer() {

    return (
      <footer className="h-52 p-4 shadow-lg-top	shadow-cyan-500/60 flex flex-col w-full items-center justify-center mt-8">
        <ul className="flex w-full items-center justify-center mb-2">
          <li className="w-10 m-2">
            <a href="https://www.instagram.com/matheus_santos_oficial.br/" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" className="w-10 fill-white border-2 rounded-3xl p-1.5 hover:bg-cyan-500 hover:fill-gray-900 hover:border-cyan-500">
                <path d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z"></path>
              </svg>
            </a>
          </li>
          <li className="w-10 m-2">
            <a href="https://www.linkedin.com/in/matheussantosspbr/" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30" className="w-10 fill-white border-2 rounded-3xl p-1.5 hover:bg-cyan-500 hover:fill-gray-900 hover:border-cyan-500">
              <path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"></path>
            </svg>
            </a>
          </li>
          <li className="w-10 m-2">
            <a href="https://github.com/matheussantosspbr" aria-label="Github">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30" className="w-10 fill-white border-2 rounded-3xl p-1.5 hover:bg-cyan-500 hover:fill-gray-900 hover:border-cyan-500">
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            </a>
          </li>
          <li className="w-10 m-2">
            <a href="mailto:contato@matheussantos.tech" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" className="w-10 fill-white border-2 rounded-3xl p-1.5 hover:bg-cyan-500 hover:fill-gray-900 hover:border-cyan-500">
              <path d="M 4 4 C 2.895 4 2 4.895 2 6 L 2 18 C 2 19.105 2.895 20 4 20 L 20 20 C 21.105 20 22 19.105 22 18 L 22 6 C 22 4.895 21.105 4 20 4 L 4 4 z M 5.5976562 6 L 18.402344 6 L 12 10 L 5.5976562 6 z M 5 8.6269531 L 12 13 L 19 8.6269531 L 19 18 L 5 18 L 5 8.6269531 z"></path>
            </svg>
            </a>
          </li>
        </ul>
        <div>
          <p className="text-white">Feito com ♥ pelo Dev. Matheus Santos.</p>
          <p className="text-white text-center">© 2022.</p>
        </div>
      </footer>
    )
  }