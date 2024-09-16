import { create } from 'zustand';


const useStore = create((set) => ({
    posts: [],
    search: '',
    searchResults: [],
    fetchError: null,
    isLoading: false,
  
    setPosts: (posts) => set({ posts }),
    setSearch: (search) => set({ search }),
    setSearchResults: (searchResults) => set({ searchResults }),
    setFetchError: (error) => set({ fetchError: error }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useStore;