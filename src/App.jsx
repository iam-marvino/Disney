import{ BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInScreen from './Screens/LogInScreen';
import HomeScreen from './Screens/HomeScreen';
import { useSelector } from 'react-redux';
import DetailPage from './Screens/DetailPage.jsx';

function App() {
  let user = useSelector((store) => store.user);
  

  return (
    <BrowserRouter>
      <div className="App">
        {user === null ? (
          <Route path="/" element={<LogInScreen />} />
        ) : (
          <Routes>
            <Route path="/" element={<LogInScreen />} />
            <Route path="home" element={<HomeScreen />} />
            <Route path='detail/:id' element={<DetailPage />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;