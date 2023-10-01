import React, { useState, useEffect } from 'react';
import '../Css/DetailPage.css';
import Header from '../LogInScreenComponents/Header';
import playIconBlack from '../assets/images/play-icon-black.png';
import playIconWhite from '../assets/images/play-icon-white.png';
import plusIcon from '../assets/images/watchlist-icon.svg';
import groupIcon from '../assets/images/group-icon.png';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailPage() {
  let { id } = useParams();
  let [detailData, setMovieData] = useState({});
    let navigate = useNavigate();
    let activeUser = useSelector((store) => store.user.email);

    useEffect(() => {
      if (activeUser === null) {
        navigate("/");
      } else {
        null
      }
    }, [activeUser]);

  useEffect(() => {
    const getMovieId = async () => {
      try {
        const movieCollectionRef = collection(db, 'movies');
        const data = await getDocs(movieCollectionRef);
        const dataArray = data.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(), // Include the data along with the id
        }));
        const movie = dataArray.find((movie) => movie.id === id); // Find the movie with the matching id
        if (movie) {
          setMovieData(movie.data); // Set the movie data
        } else {
          console.log('NO SUCH DOCUMENT IN FIREBASE');
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMovieId();
  }, [id]);

  return (
    <div className="detailPage" style={{ backgroundImage: `url(${detailData.backgroundImg})` }}>
      <Header />
      <div className="detailPageContainer">
        <img
          className="imageTitle"
          src={detailData.titleImg}
          alt=""
        />

        <div className="movieContent">
          <div className="controls">
            <button className="playButton">
              <img src={playIconBlack} alt="" />
              <span>Play</span>{' '}
            </button>

            <button className="trailerButton">
              <img src={playIconWhite} alt="" />
              <span>Trailer</span>{' '}
            </button>

            <button className="addButton">
              <img src={plusIcon} alt="" />
            </button>

            <button className="groupButton">
              <img src={groupIcon} alt="" />
            </button>
          </div>

          <div className="movieInfo">
              <p>{detailData.subTitle}</p>
          </div>

          <div className="movieDescription">
            <p>{detailData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
