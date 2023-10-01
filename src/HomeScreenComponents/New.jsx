// import React from 'react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';
import '../Css/HomeScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../Redux/movie/movieData.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


function New() {

    let movies = useSelector((state) => state.movies.newDisney);
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

        let newDisney = [];

        dataArray.forEach((doc) => {
          if (doc.type === 'new') {
            newDisney.push({ id: doc.id, ...doc });
          }
        });

        dispatch(setMovies({ newDisney }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch]);








  return (
    <div className='new'>
        
        <h4>New to Disney Plus</h4>

       
    

            <div className='newContainer'>
                {movies && movies.map((movie) => (
                <div className='newItem' key={movie.id}>
                <Link to={'/detail/' + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
                </Link>
                </div>
                ))}
            </div>

            
           
  
      
    </div>
  )
}

export default New
