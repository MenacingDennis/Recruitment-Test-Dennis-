import React, { useState, useEffect } from 'react';

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeeValue, setNewEmployeeValue] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');
    const endpoint = "http://localhost:5000/employees";

    // Fetch employees
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
    //Create new employees function
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
            await fetchEmployees(); 
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    }
    //Edit Employees function
    async function updateEmployee(event) {
        event.preventDefault();
        try {
            await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updatedName, value: parseInt(updatedValue) })
            });
            setEditingEmployee(null);
            setUpdatedName('');
            setUpdatedValue('');
            await fetchEmployees(); 
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }

    const startEditing = (employee) => {
        setEditingEmployee(employee);
        setUpdatedName(employee.name);
        setUpdatedValue(employee.value);
    };

    return (
        <div>
            <h1 className="text-4xl text-center">Employee List</h1>
            <div className="flex justify-between items-start p-4">
                <div className="text-left self-center">
                    {/* List of Employees */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employee Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employee ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.map((employee, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {employee.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {employee.value}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                            onClick={() => startEditing(employee)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-right self-start">
                    <h2 className="text-4xl text-center">Add New Employee</h2>
                    <form onSubmit={createEmployee}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newEmployeeName}
                            onChange={(e) => setNewEmployeeName(e.target.value)}
                            className="block mt-2 border rounded p-2"
                        />
                        <input
                            type="number"
                            placeholder="Value"
                            value={newEmployeeValue}
                            onChange={(e) => setNewEmployeeValue(e.target.value)}
                            className="block mt-2 border rounded p-2"
                        />
                        <button type="submit" className="block mt-2 bg-blue-500 text-white rounded p-2">
                            Add Employee
                        </button>
                    </form>
                </div>
            </div>

            {editingEmployee && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded">
                        <h2 className="text-2xl mb-4">Update Employee</h2>
                        <form onSubmit={updateEmployee}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                className="block mt-2 border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Value"
                                value={updatedValue}
                                onChange={(e) => setUpdatedValue(e.target.value)}
                                className="block mt-2 border rounded p-2"
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingEmployee(null)}
                                    className="mr-2 bg-gray-500 text-white rounded p-2"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white rounded p-2">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
