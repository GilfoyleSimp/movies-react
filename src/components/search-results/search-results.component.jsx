import { Link } from 'react-router-dom/dist';
import "./search-results.styles.css"

const SearchResults = ({ searchResult }) => {

    
    return (
        <div className='search-results-container'>
            {searchResult && searchResult.map((movie) => {
                const { Title, Year, imdbID, Type } = movie;
                
                return (
                        <div  className='search-result-movie-item'>
                            <Link style={{textDecoration:'none'}} key={imdbID} to={`/movies/${imdbID}`}>
                                <div className='movie-item-items'>
                                    <h2>{Title}</h2>
                                    <h3>{Type.charAt(0).toUpperCase() + Type.slice(1)}&#x2002;{Year}</h3>
                                </div>
                            </Link>
                        </div>
                        

                )

            })}
        </div>
    )
}

export default SearchResults;
