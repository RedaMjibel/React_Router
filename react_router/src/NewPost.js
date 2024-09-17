import { useState, useEffect } from 'react';
import useStore from './stores/Store';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

const NewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const { posts, setPosts, setSearch } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        setSearch('');
    }, [setSearch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const maxId = posts.length ? Math.max(...posts.map(post => Number(post.id))) : 0;
        const id = (maxId + 1).toString();
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id , title: postTitle, datetime, body: postBody };
        try {
          const response = await api.post('/posts', newPost);
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
        } catch (err) {
          console.log(`Error:  ${err.message}`);
        }
      }
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
