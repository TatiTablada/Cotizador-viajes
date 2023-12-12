import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Layout.module.css'


const Layout = () => {
    const location = useLocation();
    const enHistorial = location.pathname === '/historial';

    return (
        <>
            <header>
                <h1>Cotizador viajes</h1>
                {!enHistorial && (
                    <Link to="/historial" title="Ver Historial">
                        <FontAwesomeIcon icon={faFileArchive} />
                    </Link>
                )}
            </header>
            <Outlet />
        </>
    );
};


export default Layout;