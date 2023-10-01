import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auth, GoogleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { setUserLogInDetails, setSignOutState } from '../Redux/userSlice';

import '../Css/LogInScreen.css';
import disneyLogo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/home-icon.svg';
import searchIcon from '../assets/images/search-icon.svg';
import watchListIcon from '../assets/images/watchlist-icon.svg';
import originalsIcon from '../assets/images/original-icon.svg';
import moviesIcon from '../assets/images/movie-icon.svg';
import seriesIcon from '../assets/images/series-icon.svg';

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.name);
  const userEmail = useSelector((store) => store.user.email);
  const userPhoto = useSelector((store) => store.user.photo);
  const navigate = useNavigate();

  const user = useSelector((store) => store.user.email);

  async function googleLogIN() {
    try {
      await signInWithPopup(Auth, GoogleProvider);
      setUser(Auth);
      navigate('home');
    } catch (err) {
      console.log(err);
    }
  }

  async function setUser(Auth) {
    try {
      dispatch(
        setUserLogInDetails({
          name: Auth.currentUser.displayName,
          email: Auth.currentUser.email,
          photo: Auth.currentUser.photoURL,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function logOut() {
    try {
      navigate('/');
      dispatch(setSignOutState());
      signOut(Auth);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        dispatch(
          setUserLogInDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(
          setUserLogInDetails({
            name: null,
            email: null,
            photo: null,
          })
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="header">
      <div className="headerContainer">
        <img src={disneyLogo} alt="disneyLogo" className="disneyLogo" />

        { user === null  ? (
          <button className="signInButton" onClick={googleLogIN}>
            LOGIN
          </button>
        ) : (
          <>
            {
              <div className="navMenu">
                <a href="/home">
                  <img src={homeIcon} alt="homeIcon" />
                  <span className="navMenuText">HOME</span>
                </a>

                <a href="">
                  <img src={searchIcon} alt="searchIcon" />
                  <span className="navMenuText">SEARCH</span>
                </a>

                <a href="">
                  <img src={watchListIcon} alt="watchListIcon" />
                  <span className="navMenuText">WATCHLIST</span>
                </a>

                <a href="">
                  <img src={originalsIcon} alt="originalsIcon" />
                  <span className="navMenuText">ORIGINALS</span>
                </a>

                <a href="/home">
                  <img src={moviesIcon} alt="moviesIcon" />
                  <span className="navMenuText">MOVIES</span>
                </a>

                <a href="">
                  <img src={seriesIcon} alt="seriesIcon" />
                  <span className="navMenuText">SERIES</span>
                </a>
              </div>
            }

            <div className="photoContainer">
              <img src={userPhoto} alt="userPhoto" />
              <div className="dropDown">
                <div className="signOut" onClick={logOut}>
                  Sign out
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
