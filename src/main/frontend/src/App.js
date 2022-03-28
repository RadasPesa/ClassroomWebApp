import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComp from './components/NavbarComp';

function App() {

  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <NavbarComp />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
