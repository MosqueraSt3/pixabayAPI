import React, { useState, useEffect } from 'react'

import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  // STATE
  const [ busqueda, guardarBusqueda ] = useState('')
  const [ imagenes, guardarImagenes ] = useState([])
  const [ paginaactual, guardarPaginaActual ] = useState(1)
  const [ totalpaginas, guardarTotalPaginas ] = useState(1)

  // EFFECT
  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return
      const IMG_POR_PAGINA = 15
      const PIXABAY_KEY = '20535163-16f028e5b2b0f5d3cc49c6fa6'
      const URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${busqueda}&per_page=${IMG_POR_PAGINA}&page=${paginaactual}`
      const respuesta = await fetch(URL)
      const resultado = await respuesta.json()
      guardarImagenes(resultado.hits)

      // Calcular el total de paginas
      const totalPag = Math.ceil(resultado.totalHits / IMG_POR_PAGINA)
      guardarTotalPaginas(totalPag)

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    consultarAPI()
  }, [busqueda, paginaactual])

  // Pagina Anterior
  const paginaAnterior = () => {
    const pagActual = paginaactual - 1
    if (pagActual === 0) return
    guardarPaginaActual(pagActual)
  }

  // Pagina Siguiente
  const paginaSiguiente = () => {
    const pagActual = paginaactual + 1
    if (pagActual > totalpaginas) return
    guardarPaginaActual(pagActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
        { (paginaactual === 1) ? null : 
          <button 
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          > &laquo; Anterior</button>
        }
        { (paginaactual === totalpaginas) ? null : 
          <button 
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo; </button>
        }
      </div>
    </div>
  )
}

export default App;
