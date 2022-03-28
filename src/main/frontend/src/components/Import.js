import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

const Import = () => {

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const [isLoading, setLoading] = useState(false);

    function importClasses() {
        setLoading(true);
        const url = 'http://localhost:8080/classrooms';
        axios.post(url)
        .then(response => {
            setSuccess(response.data);
            setLoading(false);
        })
        .catch(error => {
            throwError(error.message)
            setLoading(false);
        });
    }

    function throwError(err) {
        setErrors([...errors, err]);
    }

    return (
        <div className='d-grid gap-2'>
            <h2>Importing classrooms</h2>
            <Button
                variant='primary'
                size='lg'
                onClick={importClasses}
                disabled={isLoading}
            >{isLoading ? 'Importing..' : 'Import'}
            </Button>
            <Alert variant='success' hidden={!success.length > 0}>
                {success}
            </Alert>
            <Alert variant='danger' hidden={!errors.length > 0}>
                {errors}
            </Alert>
        </div>
    )
}

export default Import