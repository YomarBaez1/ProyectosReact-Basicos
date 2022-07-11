import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  // state de la app

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [pagina, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);


   useEffect(() =>{
    
    const consultarAPI = async () =>  {
    if(busqueda === '') return;

    const imagenesPorPagina = 30;
    const key='28554402-d4ffa25c4e420c05ff8f31775';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${pagina}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
  
    guardarImagenes(resultado.hits);

      // calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth' })

    }
    consultarAPI();

   }, [busqueda, pagina])

   // Definir la pagina anterior

   const paginaAnterior = () => {
      const nuevaPaginaActual = pagina - 1;

      if(nuevaPaginaActual === 0) return;

      guardarPaginaActual(nuevaPaginaActual)
   }

   // Definir la pagina siguiente

   const paginaSiguiente = () => {
    const nuevaPaginaActual = pagina + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual)
 }

  return (
   <div className='cotainer'>
    <div className='jumbotron'>
      <p className="lead text-center"> Buscador de Imagenes</p>

      <Formulario
      guardarBusqueda={guardarBusqueda }
      />
    </div>
    <div className='row justify-content-center'>
      <ListadoImagenes 
      imagenes={imagenes}
      />
      
      {(pagina === 1) ? null : (
        <button
            type="button"
            className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >Anterior &laquo;</button>
      )}

      {(pagina === totalpaginas) ? null : (
        <button
        type="button"
        className="bbtn btn-info"
        onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
      )}
    </div>
   </div>
  );
}

export default App;
