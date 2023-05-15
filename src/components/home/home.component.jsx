import '../home/home.styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import SearchResults from '../search-results/search-results.component';


const Home = () => {

    const [searchResult, setSearchResult] = useState([])
    const [searchField, setSearchField] = useState('')
    const [displaySearchResult, setDisplaysearchResult] = useState(false)

    useEffect(() => {
        const fetchData = async () => {

            await axios.get(`https://www.omdbapi.com/?apikey=ff91bf6e&s=${searchField}`)
                .then((response) => {
                    setSearchResult(response.data.Search)

                }).catch((error) => {
                    console.error(error)
                })
        }
        fetchData();

    }, [searchField])
    
    const handleOnSubmit = (event) => {
        event.preventDefault()
        setDisplaysearchResult(true)
    }
    
    return (
        <div className='home-container'>
            <div className='search-container'>
                
                <form onSubmit={handleOnSubmit} class="d-flex p-5" role="search">
                    <input class="form-control me-2" type="search"
                        onChange={(e) => setSearchField(e.target.value)}
                        placeholder="Search Movie..."
                        aria-label="Search" />
                    <button class="btn btn-outline-warning" type="submit"
                    style={{color:'black'}}>Search</button>
                </form>
            </div>
            <div className='results-container'>
                { displaySearchResult && searchResult &&
                 <SearchResults searchResult={searchResult}/> }
            </div>

        </div>
    )
}

export default Home;