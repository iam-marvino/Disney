import React, { useEffect } from 'react';
import '../Css/HomeScreen.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../Redux/movie/movieData.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Recommended = () => {
  const movies = useSelector((state) => state.movies.recommend);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieCollectionRef = collection(db, 'movies');
        const data = await getDocs(movieCollectionRef);
        const dataArray = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let recommend = [];

        dataArray.forEach((doc) => {
          if (doc.type === 'recommend') {
            recommend.push({ id: doc.id, ...doc });
          }
        });

        dispatch(setMovies({ recommend }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div className='recommended'>
      <h4>Recommended For You</h4>
      <div className="recommendedContainer">
        {movies && movies.map((movie) => (
          <div className='recommendedItem' key={movie.id}>
            <Link to={'/detail/' + movie.id}>
              <img src={movie.cardImg} alt={movie.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
