import React, { useState } from 'react'

import PropTypes from 'prop-types'

import Error from './Error'

const Formulario = ({guardarBusqueda}) => {

    // STATE
    const [ termino, guardarTermino ] = useState('')
    const [ error, guardarError ] = useState(false)

    // SUBMIT
    const handleSubmit = e => {
        e.preventDefault()

        // Validar
        if (termino.trim() === '') {
            return guardarError(true)
        }
        guardarError(false)

        // Enviar el termino a App
        guardarBusqueda(termino)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una Imagen"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
        </form>
    )
}

Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}

export default Formulario