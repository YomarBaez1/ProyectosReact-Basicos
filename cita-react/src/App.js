import React, {Fragment, useState, useEffect} from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Forumulario";




function App() {

 // Citas LocalStorage
 
 
// Arreglo de citas
const [citas, guardarCitas] = useState([]);

// Use Effect para realizar operaciones cuando el State cambia



// Funcion que tome citas actuales y agregue nuevas

const crearCita = cita => {

  guardarCitas([

    ...citas,
    cita
  ]); 
}

// Funcion que elimina una cita por su id

const eliminarCita = id => {

const nuevasCitas = citas.filter(cita => cita.id !== id );
guardarCitas(nuevasCitas);
}

// Mensaje Condicional
const titulo = citas.length === 0 ? 'No hay citas disponibles' : 'Administra tus citas';



  return (
    <Fragment>
    <h1>Administrador de Pacientes</h1>

<div className="container">
<div className="row">
<div className="one-half column">
  
<Formulario
crearCita={crearCita}
/>


</div>
<div className="one-half column">
  <h2>{titulo}</h2>
 {citas.map(cita => (

<Cita
key={cita.id}
cita={cita}
eliminarCita={eliminarCita}
/>


 ))}



</div>
</div>
</div>

</Fragment>

  );
}



export default App;
