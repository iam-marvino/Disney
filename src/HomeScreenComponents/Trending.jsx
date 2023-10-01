// import React from 'react'
import React, { useEffect } from 'react';
import '../Css/HomeScreen.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../Redux/movie/movieData.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Trending() {
  const movies = useSelector((state) => state.movies.trending);
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

        let trending = [];

        dataArray.forEach((doc) => {
          if (doc.type === 'trending') {
            trending.push({ id: doc.id, ...doc });
          }
        });

        dispatch(setMovies({ trending }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch]);
  return (
    <div className='trending'>

        <h4>Trending</h4>
      
        <div className="trendingContainer">


            {movies && movies.map((movie) => (
            <div className='trendingItem' key={movie.id}>
            <Link to={'/detail/' + movie.id}>
            <img src={movie.cardImg} alt={movie.title} />
            </Link>
            </div>
            ))}


        </div>
    </div>
  )
}

export default Trending
