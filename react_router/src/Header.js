import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"
import useWindowSize from './hooks/useWindowSize';
import useStore from "./stores/Store";

const Header = ({ title }) => {
    const { setSearch } = useStore();
    const { width } = useWindowSize();
    return (
        <header className="Header">
            <Link to="/" onClick={() => setSearch('')}><h1>{title}</h1></Link>
            {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
        </header>
    )
}

export default Header

