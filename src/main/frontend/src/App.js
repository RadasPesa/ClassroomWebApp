import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComp from './components/NavbarComp';
import { useState } from 'react';
import Login from './components/Login';

function App() {

  const [user, setUser] = useState(getUserToken());

  function setUserToken(userToken) {
    localStorage.setItem('userToken', userToken)
    // pri jsonu misto "userToken" by bylo "JSON.stringify(userToken)"
    setUser(userToken);
  }

  function getUserToken() {
    const userToken = localStorage.getItem('userToken');
    return userToken || "";
  }


  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            {!user ? (
              <Login setUserToken={setUserToken} />
            ) : (
              <NavbarComp user={user} setUserToken={setUserToken} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
