import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import useStore from './stores/Store';
import api from './api/posts';
import { useNavigate } from 'react-router-dom';


const PostPage = () => {
    const { posts, setPosts, setSearch } = useStore();
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          navigate('/');
          setSearch('');
        } catch (err) {
          console.log(`Error:  ${err.message}`);
        }
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post && 
                    <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                    <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                    </>
                }
                {!post &&
                    <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's diappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                    </>
                }
            </article>
            <h1>PostPage</h1>
        </main>
    )
}

export default PostPage
