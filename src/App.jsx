import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import Layout from './components/Layout';
import Historial from './components/Historial';

const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
  <Route path='/' element={<Layout />}>
  <Route index element={ <Formulario />} />
  <Route path="historial" element= {<Historial />}/>
  </Route>
    </Routes>
   </BrowserRouter>
  </>
  );
};

export default App;

