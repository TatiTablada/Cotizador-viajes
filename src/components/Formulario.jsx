import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from '../css/Formulario.module.css'

const Formulario = () => {
const [historial, setHistorial] = useState (() => {
  let storage = localStorage.getItem("historial");
  if (storage) return JSON.parse(storage);
  localStorage.setItem("historial", JSON.stringify([]));
  return [];
});

const [load, setLoad] = useState(true);
const [listTravel, setListTravel] = useState([]);
const [listCompany, setListCompany] = useState([]);
const [optionTravel, setOptionTravel] = useState(null);
const [optionCompany, setOptionCompany] = useState(null);
const [value, setValue] = useState(null);
const [total, setTotal] = useState(null);
 

useEffect (() => {
  setLoad(true);
  fetch("/data.json")
  .then((res) => res.json())
  .then((datos) => {
    setListTravel(datos.filter(({type}) => type == "travel"));
    setListCompany(datos.filter(({type}) => type == "company"));
  })
    .catch((error) => console.error(error))
    .finally(() => setLoad(false));
  

}, []);

useEffect (
  () => localStorage.setItem("historial", JSON.stringify(historial)), [historial]
);

const cotizar = (e) => {
  e.preventDefault();
  if(value <= 0 || optionTravel == null || optionCompany == null) {
   return Swal.fire({
      icon: "warning",
      text: "Debe completar todos los datos solicitados",
      title: "Algo salió mal...",
    }); 
  }
  setLoad(true)
  setTimeout(() => {
  setTotal (2000*parseFloat(value) * optionTravel * optionCompany);
  setLoad(false);
  e.target.reset();
  }, 3000);
};

const guardar = () => {
  setHistorial([...historial,
  {
  fecha:new Date().toLocaleDateString("es-mx"),
  time:new Date().toLocaleTimeString("es-mx"),
  viaje: listTravel.find(({id}) => id == optionTravel),
  company: listCompany.find(({id}) => id == optionCompany),
  total: total.toFixed(2),
},
]);
setTotal(null);

  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Historial actualizado",
    showConfirmButton: false,
    timer: 1500
  });
};

return ( 

  <>
  {load && (
    <>
    <section className={styles.cargando}>
    <p>Calculando el monto, por favor espera...</p>
    <img className={styles.loadingGif} src="public\assets\loading.gif" alt="" />
    </section>
    </>
  )}
  {!load && (
      <form onSubmit={cotizar}>
        <fieldset>
          <label htmlFor="viaje">Destino</label>
          <select name="viaje" id="viaje" defaultValue={0} onChange={({target}) => setOptionTravel(target.value)}>
          <option value= {0} disabled>Seleccionar destino disponible</option>
          {listTravel.map(({id,content}) => <option key={id} value={id}>{content}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="empresa">Empresa</label>
          <select name="empresa" id="empresa" defaultValue={0} onChange={({target}) => setOptionCompany(target.value)}>
          <option value= {0} disabled>Seleccione una empresa</option>
          {listCompany.map(({id,content}) => <option key={id} value={id}>{content}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="cantidad">¿Cuántos pasajeron son?</label>
          <input type="number" name="cantidad" id="cantidad" min={1} max={4} defaultValue={0} onInput={({ target }) => setValue(target.value)} />
        </fieldset>
        <button type="submit" className={styles.btnCotizar}>Cotizar</button>
      </form>
    )}
    {total && ( <form onSubmit={(e) => e.preventDefault()}><h2>Total: ${total.toFixed(2)}</h2>
    <button type="button" onClick={guardar} className={styles.btnSave}>Guardar</button>
    
    </form>
    
    )}
  </>
  );
}; 

export default Formulario;


