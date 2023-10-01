import React, { useEffect } from 'react';
import Header from '../LogInScreenComponents/Header';
import '../Css/HomeScreen.css';
import ImageSlider from '../HomeScreenComponents/imageSlider';
import Viewers from '../HomeScreenComponents/Viewers';
import Recommended from '../HomeScreenComponents/Recommended';
import New from '../HomeScreenComponents/New';
import Originals from '../HomeScreenComponents/Originals';
import Trending from '../HomeScreenComponents/Trending';
import { useDispatch } from 'react-redux';
import { setMovies } from '../Redux/movie/movieData.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomeScreen() {
  const dispatch = useDispatch();
    let navigate = useNavigate();
    let activeUser = useSelector((store) => store.user.email);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieCollectionRef = collection(db, 'movies');
        const data = await getDocs(movieCollectionRef);
        const dataArray = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let recommend = [];
        let newDisney = [];
        let original = [];
        let trending = [];

        dataArray.forEach((doc) => {
          switch (doc.type) {
            case 'recommend':
              recommend.push({ id: doc.id, ...doc });
              break;
            case 'new':
              newDisney.push({ id: doc.id, ...doc });
              break;
            case 'original':
              original.push({ id: doc.id, ...doc });
              break;
            case 'trending':
              trending.push({ id: doc.id, ...doc });
              break;
            default:
              break;
          }
        });

        dispatch(
          setMovies({
            recommend,
            newDisney,
            original,
            trending,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    getMovies();
  }, [dispatch]);

    useEffect(() => {
      if (activeUser === null) {
        navigate("/");
      } else {
        null
      }
    }, [activeUser]);

  return (
    <div className='home'>
      <Header />
      <div className='homeContainer'>
        <ImageSlider />
        <Viewers />
        <Recommended />
        <New />
        <Originals />
        <Trending />
      </div>
    </div>
  );
}

export default HomeScreen;
