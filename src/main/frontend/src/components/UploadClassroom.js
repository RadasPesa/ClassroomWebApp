import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

const UploadClassroom = () => {

    const [buildingAbbr, setBuildingAbbr] = useState('');
    const [classroomNumber, setClassroomNumber] = useState();
    const [capacity, setCapacity] = useState();
    const [department, setDepartment] = useState("Select a department");

    const [deps, setDeps] = useState([]);

    const [validBuildingAbbr, setValidBuildAbrr] = useState(false);

    const formRef = useRef(null);

    function handleDepartmentChange(event) {
        setDepartment(event.target.value);
    }

    function uploadClassroom(event) {
        event.preventDefault();

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
                resetForm();
            })
            .catch(error => {
                console.log("Error: " + error.message);
            })
    }

    function resetForm() {
        formRef.current.reset();
        setBuildingAbbr("");
        setClassroomNumber();
        setCapacity();
        setDepartment("Select a department");
        setValidBuildAbrr(false);
    }

    useEffect(() => {
        setValidBuildAbrr(buildingAbbr.length > 0);
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
            <Form onSubmit={uploadClassroom} ref={formRef}>
                <Form.Group className='mb-3'>
                    <Form.Label>Building abbreviation</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter building abbreviation'
                        onChange={e => setBuildingAbbr(e.target.value)}
                        isValid={validBuildingAbbr}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Classroom number</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter classroom number'
                        onChange={e => setClassroomNumber(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter classroom capacity'
                        onChange={e => setCapacity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Department</Form.Label>
                    <Form.Select aria-label='Default select example' onChange={handleDepartmentChange}>
                        <option>Select a department</option>
                        {deps.map((department) => <option key={department} value={department}>{department}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant='primary' type='submit'>Insert classroom</Button>
            </Form>
        </div>
    )
}

export default UploadClassroom