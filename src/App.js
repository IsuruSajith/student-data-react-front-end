import React, { useState, useEffect } from 'react';

const App = () => {
    const [formData, setFormData] = useState({
        studentIndex: '',
        name: '',
        profession: '',
        gender: 'MALE'
    });

    const [allData, setAllData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getAllData();
    }, []);

    const submitForm = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/v1/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setMessage('Data submitted successfully.');
            getAllData();
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error submitting data.');
        }
    };

    const getAllData = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/v1/students');
            const data = await response.json();
            setAllData(data.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error fetching data.');
        }
    };

    return (
        <div>
            <form>
                <label htmlFor="studentIndex">Student Index:</label>
                <input
                    type="text"
                    id="studentIndex"
                    name="studentIndex"
                    value={formData.studentIndex}
                    onChange={(e) => setFormData({ ...formData, studentIndex: e.target.value })}
                    required
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <label htmlFor="profession">Profession:</label>
                <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    required
                />

                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>

                <button type="button" onClick={submitForm}>
                    Submit
                </button>
            </form>

            <button type="button" onClick={getAllData}>
                Get All Data
            </button>

            <div>
                <h2>Received Data:</h2>
                {message && <p>{message}</p>}
                {allData.map((dataObject, index) => (
                    <div key={index}>
                        <strong>Data Object {index + 1}:</strong>
                        {Object.entries(dataObject).map(([key, value]) => (
                            <p key={key}>
                                {key}: {value}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
