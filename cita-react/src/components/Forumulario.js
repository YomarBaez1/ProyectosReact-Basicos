import React, {Fragment, useState} from 'react';
import { nanoid } from 'nanoid'
import PropTypes from "prop-types";




const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'', 
        hora:'',
        sintomas:''
    });

    const [ error, ActualizarError] = useState(false)

    // Funcion que se ejecuta cada vez que el usuario escribe en un Input

    const actualizarState = e => {

     actualizarCita({
        ...cita,
        [e.target.name] : e.target.value
     })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona agregar cita.
    const submitCita = e => {

       e.preventDefault();

       // Validar 

       if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' 
    || hora.trim() === '' || sintomas.trim() === '' ){
       ActualizarError(true)
        return; 
       }

       //Eliminar el mensaje previo despues de pasar la validacion 
       ActualizarError(false);
    
       //Asignar un ID
       cita.id = nanoid();
  

       //Crear Cita

       crearCita(cita);

       // Reiniciar el Form

       actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'', 
        hora:'',
        sintomas:''
       })

    }

    return (  

        <Fragment>

{ error ? <p className='alerta-error'>Todos los campos deben ser llenados</p>
            :null}
       

            <h2>Crear Cita</h2>
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                  <label>Nombre Due??o</label>
                 <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Due??o de la mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                 <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                 <label>Hora</label>
                 <input
                    type='Time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                 <label>Sintomas</label>
                <textarea
                className='u-full-width'
                name='sintomas'
                onChange={actualizarState}
                value={sintomas}
                ></textarea>

                <button
                type='submit'
                className='u-full-width button-primary'
                >Agregar Cita</button>

          


            </form>
        </Fragment>


    );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
 
export default Formulario;