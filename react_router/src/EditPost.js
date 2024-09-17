import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from './stores/Store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';

const EditPost = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { posts, setPosts, setSearch } = useStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = {id , title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, updatePost);
          setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
          setSearch('');
        } catch (err) {
          console.log(`Error:  ${err.message}`);
        }
      }

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTtitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
                </>
        }
        {!editTitle &&
                    <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's diappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                    </>
                }
        </main>
    )
}

export default EditPost
