import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from '../css/Historial.module.css'


const Historial = () => {
  const [historial, setHistorial] = useState (() => {
    let storage = localStorage.getItem("historial");
    if (storage) return JSON.parse(storage);
    localStorage.setItem("historial", JSON.stringify([]));
    return [];
  });
  
  useEffect (
    () => localStorage.setItem("historial", JSON.stringify(historial)), [historial]
  );
  
  const eliminarHistorial = () => {
    setHistorial([]);
  };


    return (
      <>
      <h1>Historial</h1>
      <ul>
      {historial.map((elemento, index) => (
         <li key={index}>
         <p>Fecha: {elemento.fecha}</p>
         <p>Hora: {elemento.time}</p>
         <p>Viaje a: {elemento.viaje.content}</p>
         <p>Empresa: {elemento.company.content}</p>
         <p>Total: ${elemento.total}</p>
       </li>
      ))}
    </ul>
       <button className={styles.btnDelete} onClick={eliminarHistorial}>
        Eliminar Historial
      </button>
       <Link to="/" title='Regresar'>
       <button className={styles.btnBack}>Volver</button>
     </Link>
  </>
  );
};
    
export default Historial;