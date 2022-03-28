import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const UploadClassroom = () => {

    const [buildingAbbr, setBuildingAbbr] = useState('');
    const [classroomNumber, setClassroomNumber] = useState();
    const [capacity, setCapacity] = useState();
    const [department, setDepartment] = useState("Select a department");

    const [deps, setDeps] = useState([]);

    const [validBuildingAbbr, setValidBuildAbrr] = useState(false);

    function handleDepartmentChange(event) {
        setDepartment(event.target.value);
    }

    function uploadClassroom(event) {
        event.preventDefault();
        // TODO: post classroom
        const url = 'http://localhost:8080/classroom';
        const body = {
            buildingAbbr: buildingAbbr,
            classroomNumber: classroomNumber,
            capacity: capacity,
            department: department
        };

        axios.post(url, body)
            .then(response => {
                console.log("Success: " + response.data);
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }

    function updateBuildingAbbreviation(event) {
        setBuildingAbbr(event.target.value);
    }

    function updateClassroomNumber(event) {
        setClassroomNumber(event.target.value);
    }

    function updateCapacity(event) {
        setCapacity(event.target.value);
    }

    function handleValidBuildingAbbr() {
        if (buildingAbbr.length > 0) {
            setValidBuildAbrr(true);
        } else {
            setValidBuildAbrr(false);
        }
    }

    useEffect(() => {
        handleValidBuildingAbbr();
    }, [buildingAbbr]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    async function fetchDepartments() {
        const url = 'http://localhost:8080/departments';
        try {
            const result = await axios.get(url);
            result.data.forEach(i => setDeps((deps) => [...deps, i.departmentAbbr]));
        } catch (error) {
            console.log('Catch error');
        }
    }

    return (
        <div>
            <h2>Upload a classroom</h2>
            <Form onSubmit={uploadClassroom}>
                <Form.Group className='mb-3'>
                    <Form.Label>Building abbreviation</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter building abbreviation'
                        onChange={updateBuildingAbbreviation}
                        isValid={validBuildingAbbr}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Classroom number</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter classroom number'
                        onChange={updateClassroomNumber}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter classroom capacity'
                        onChange={updateCapacity}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Department</Form.Label>
                    <Form.Select aria-label='Default select example' onChange={handleDepartmentChange}>
                        <option>Select a department</option>
                        {deps.map((department) => <option value={department}>{department}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant='primary' type='submit'>Insert classroom</Button>
            </Form>
        </div>
    )
}

export default UploadClassroom