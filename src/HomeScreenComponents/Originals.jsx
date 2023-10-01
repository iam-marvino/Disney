// import React from 'react'
import React, { useEffect } from 'react';
import '../Css/HomeScreen.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../Redux/movie/movieData.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Originals() {
    const movies = useSelector((state) => state.movies.original);
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
  
          let original = [];
  
          dataArray.forEach((doc) => {
            if (doc.type === 'original') {
                original.push({ id: doc.id, ...doc });
            }
          });
  
          dispatch(setMovies({ original }));
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchMovies();
    }, [dispatch]);





    
  return (
    <div className='originals'>
         
         <h4>Originals</h4>
         
        <div className="originalsContainer">

            {movies && movies.map((movie) => (
          <div className='originalsItem' key={movie.id}>
            <Link to={'/detail/' + movie.id}>
              <img src={movie.cardImg} alt={movie.title} />
            </Link>
          </div>
        ))}
           
        </div>

    </div>
  )
}

export default Originals
