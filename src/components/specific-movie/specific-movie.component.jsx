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
            <h1>{Title} <span>{Year}</span></h1> <img src={Poster}/>
            <h3><span>{Year}</span> : {Genre}</h3>
            <h3>{Director}</h3>
        </div>
    )
}

export default SpecificMovie;