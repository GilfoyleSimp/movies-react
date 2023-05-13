import '../specific-movie/specific-movie.styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import axios from 'axios';

const SpecificMovie = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {

            await axios.get(`https://www.omdbapi.com/?apikey=ff91bf6e&i=${movieId}`)
                .then((response) => {
                    setMovie(response.data)
                }).catch((error) => {
                    console.error(error)
                })
        }

        fetchData();

    }, [movieId])

    const { Title, Year, imdbRating, Type, Runtime, Plot, Genre, Director, BoxOffice, Actors , Poster} = movie

    return (
        <div>
            <h1>{Title} <span>{Year}</span></h1> <img alt='Movie Poster' src={Poster}/>
            <h3><span>{Year}</span> : {Genre}</h3>
            <h3>{Director}</h3>
            <div className="btn-group">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Movie Info
                </button>
                <ul className="dropdown-menu">
                    <li><p className="dropdown-item" >{Actors}</p></li>
                    <li><p className="dropdown-item" >{BoxOffice}</p></li>
                    <li><p className="dropdown-item" >{Plot}</p></li>
                    <li><p className="dropdown-item" >{Runtime}</p></li>
                    <li><p className="dropdown-item" >Rating:{imdbRating}</p></li>
                    <li><p className="dropdown-item" >{Type}</p></li>
                </ul>
            </div>
            <button>Add to WatchList</button>
        </div>
    )
}

export default SpecificMovie;