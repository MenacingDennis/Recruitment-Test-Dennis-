import React, { useState, useEffect } from 'react';

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeeValue, setNewEmployeeValue] = useState('');
    const endpoint = "http://localhost:5000/employees";

    // Fetch employees from the server and update the state
    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }

    async function getEmployees() {
        return fetch(endpoint).then(response => response.json());
    }

    async function createEmployee(event) {
        event.preventDefault();
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newEmployeeName, value: parseInt(newEmployeeValue) })
            });
            setNewEmployeeName('');
            setNewEmployeeValue('');
            await fetchEmployees(); // Refresh the employee list after creating a new employee
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    }

    async function updateEmployee(name, value) {
        try {
            await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, value })
            });
            await fetchEmployees(); // Refresh the employee list after updating an employee
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    return (
        <div>
            <h1>Employee List</h1>
        <table>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            <h2>Add New Employee</h2>
            <form onSubmit={createEmployee}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Value"
                    value={newEmployeeValue}
                    onChange={(e) => setNewEmployeeValue(e.target.value)}
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}
