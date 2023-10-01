// import React from 'react'
import '../Css/LogInScreen.css'
import logoOne from '../assets/images/cta-logo-one.svg'
import logoTwo from '../assets/images/cta-logo-two.png'
import Header from '../LogInScreenComponents/Header'
import { Auth,GoogleProvider} from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLogInDetails } from '../Redux/userSlice';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'






function LogInScreen() {

  const dispatch = useDispatch();
  let navigate = useNavigate()
  let activeUser = useSelector((store)=> store.user.email)



  async function logIn(){
     try{
      await signInWithPopup(Auth,GoogleProvider)
      navigate('/home')
     }catch(err){
      console.log(err)
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

  useEffect(()=>{
    setUser()
  },[])

  useEffect(()=>{
    if(activeUser === null){
      navigate('/')
    }else{
      navigate("/home");
    }
  },[activeUser])

  return (
      <div className="logInContainer">
        <Header />
        <main>
            <img src={logoOne} alt="logoOne" className='logoOne' />

        <button onClick={logIn}>GET ALL THERE </button>

        <p>Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price pd Disney+ and the Disney Bundle will increase by 1$ </p>
       
        <img src={logoTwo} alt="logoTwo" className='logoTwo' />

        </main>
      </div>
  )
}

export default LogInScreen
