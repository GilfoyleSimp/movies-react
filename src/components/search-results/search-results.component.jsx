import { Link } from 'react-router-dom/dist';

const SearchResults = ({ searchResult }) => {

    
    return (
        <div>
            {searchResult && searchResult.map((movie) => {
                const { Title, Year, imdbID, Type } = movie;
                
                return (
                    <>
                        <Link to={`/movies/${imdbID}`}>
                            <div key={imdbID}>
                                <h2>{Title}</h2>
                                <h3>{Type}: {Year}</h3>
                            </div>
                        </Link>
                        
                    </>


                )

            })}
        </div>
    )
}

export default SearchResults;