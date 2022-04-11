import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Import from './Import';
import UploadClassroom from './UploadClassroom';

const NavbarComp = (props) => {

    function logout() {
        props.setUserToken("");
    }

    return (
        <Router>
            <div>
                <Navbar variant='dark' expand="lg">
                    <Navbar.Brand>Classroom App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link as={Link} to={'/import'}>Import</Nav.Link>
                            <Nav.Link as={Link} to={'/upload'}>Upload</Nav.Link>
                        </Nav>
                        <Nav className='justify-content-end' style={{ width: "100%" }}>
                            <Nav.Link onClick={logout}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route exact path='/' element={
                        <h1>Hello {props.user}</h1>
                    }>
                    </Route>
                    <Route exact path='/import' element={
                        <Import />
                    }>   
                    </Route>
                    <Route exact path='/upload' element={
                        <UploadClassroom />
                    }>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default NavbarComp