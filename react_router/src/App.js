import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import EditPost from './EditPost';
import { useEffect } from 'react';
import useAxioseFetch from './hooks/useAxiosFetch';
import useStore from './stores/Store';

function App() {
  const { setPosts, posts, search, setSearchResults } = useStore();
  const { data } = useAxioseFetch('http://localhost:3500/posts');

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  return (
    <div className="App">
      <Header title="React Js Blog" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
