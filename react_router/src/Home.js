import Feed from "./Feed"
import useStore from './stores/Store';

const Home = () => {
    const { searchResults, fetchError, isLoading } = useStore();
    return (
        <main className="Home">
            {isLoading && !fetchError && <p className="statusMsg">loading posts ...</p>}
            {fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed />
            : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home
