import '../watch-list/watch-list.styles.css';
import { getDocs, collection, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

const WatchList = () => {

    const [movieList, setMovieList] = useState([])
    const watchListRef = collection(db, 'watchList')
    const { currentUser } = useContext(UserContext)


    const getMovies = async () => {
        try {
            const data = await getDocs(watchListRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })).filter((doc) => doc.uid === currentUser?.uid);
            setMovieList(() => {
                return filteredData ? filteredData : null;
            })

        }

        catch (err) {
            console.error(err)
        }
    }

    const checkWatched = async (id) => {
        const movieDoc = doc(db, 'watchList', id);
        const movieDocSnapshot = await getDoc(movieDoc);
        const movieData = movieDocSnapshot.data();
        await updateDoc(movieDoc, { watched: !movieData.watched });
        getMovies();
      };

      const deleteMovie = async (id) => {
        const movieDoc = doc(db, 'watchList', id);
        await deleteDoc(movieDoc)
        getMovies()
        alert('Movie removed')

      }

    useEffect(() => {
        getMovies();
    }, [])


    return (
        <div>
            {movieList.map((movie) => {
                const { movieName, watched, rating, id } = movie;
                return (
                    <div>
                        <h1>Title: {movieName}</h1>
                        <p>{rating ? rating : 'You have not rated that movie'}</p>
                        <input type='checkbox'
                            onChange={() => checkWatched(id)}
                            checked={watched} />
                        <label>Watched?</label>
                        <button onClick={() => deleteMovie(id)}>Remove from watchlist</button>
                    </div>

                )

            })}
        </div>
    )
}

export default WatchList;