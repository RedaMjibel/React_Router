import { Link, useLocation } from "react-router-dom"
import useStore from "./stores/Store";

const Nav = () => {
    const { search, setSearch } = useStore();
    const location = useLocation();

    const handleHomeClick = () => {
        setSearch('');
    };

    const hideSearch = location.pathname === '/post' || /^\/edit\/\d+/.test(location.pathname);

    return (
        <nav className="Nav">
            {!hideSearch && (
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            )}
            <ul>
                <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
