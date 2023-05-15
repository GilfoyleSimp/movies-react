import '../specific-movie/specific-movie.styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import axios from 'axios';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom/dist';


const SpecificMovie = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})
    const watchListRef = collection(db, 'watchList')
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()

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

    const { Title, Year, imdbRating, Type, Runtime, Plot, Genre, Director, BoxOffice, Actors, Poster } = movie

    const addMovie = async () => {
        if (currentUser === null) {
            alert('User not signed in')
            return
        }

        try {
            const q = query(watchListRef,
                where('movieId', '==', movieId),
                where('uid', '==', currentUser.uid))
            const querySnapshot = await getDocs(q)
            let matchingMovie = null
            querySnapshot.forEach(doc => {
                // Extract the document data and add the document ID to the object
                matchingMovie = { ...doc.data(), id: doc.id }
            })

            if (matchingMovie) {
                alert('Movie already in Watch List')
                return
            }

            await addDoc(watchListRef, {
                addedDate: Date.now(),
                movieId: movieId,
                movieName: Title,
                rating: null,
                uid: currentUser.uid,
                watched: false
            })
            alert('Movie added')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='spec-movie-container'>
            <h1 className='spec-movie-title'>{Title} <span>{Year}</span></h1> 
            <img className='spec-movie-poster' alt='Movie Poster' src={Poster} />
            <h3><span>{Type} &#x2002; {Year}</span> &#x2002; {Genre}</h3>
            <h3>{Director}</h3>
            <div className='spec-movie-more-info'>
                <p className="dropdown-item" >{Actors}<hr/></p> 
                <p className="dropdown-item" >{BoxOffice}</p><hr/>
                <p className='' >{Plot}</p><hr/>
                <p className="dropdown-item" >{Runtime}</p><hr/>
                <p className="dropdown-item" >Rating:{imdbRating}</p>
            </div>
            <button onClick={addMovie}>Add to WatchList</button>
        </div>
    )
}

export default SpecificMovie;