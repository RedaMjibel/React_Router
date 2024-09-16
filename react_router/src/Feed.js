import Post from "./Post"
import useStore from './stores/Store';

const Feed = () => {
    const { searchResults } = useStore();
    return (
        <>
            {searchResults.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}

export default Feed
