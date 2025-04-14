import React from 'react';
import Table from "../../../GlobalComponent/Table/Component";  // Importing global Table component
import Modal from "../../../SharedComponent/Modal/Component";
import InputField from "../../../GlobalComponent/InputForm/Component";
import Button from "../../../GlobalComponent/Button/Component";

const ViewDepartment = ({ searchCriteria,handleSearchChange,departments, onEdit, onDelete, departmentData, setDepartmentData, showModal, setShowModal, handleInputChange, handleUpdate, employees, handleEmployeeSelection, row, page, setCurrentPage, setRowsPerPage, count,roleName }) => {
    const columns = [
        { name: "Department Id", value: "id" },
        { name: "Department Name", value: "departmentName" },
        { name: "Category", value: "category" },
        { name: "Location", value: "location" },
        { name: "Salary", value: "salary" },
        ...(roleName === "Manager" ? [{ name: "Assigned Employees", value: "assignedEmployees" }] : [])
    ];
    
    const rows = departments.map((dept) => {
        const baseRow = {
            id: dept._id,
            departmentName: dept.departmentName,
            category: dept.category,
            location: dept.location,
            salary: dept.salary,
        };
    
        // Add assignedEmployees only if the role is "Manager"
        if (roleName === "Manager") {
            baseRow.assignedEmployees = dept?.user && dept.user.length > 0
                ? dept.user.map(d => d.email).join(' , ')  // Join with commas
                : "Not assigned any users";
        }
    
        return baseRow;
    });
    
    

    return (
        <>
            <h3>Departments</h3>
           
            <Table
                columns={columns}
                rows={rows}
                setCurrentPage={setCurrentPage}
                setRowsPerPage={setRowsPerPage}
                onEdit={onEdit}
                onDelete={onDelete}
                rowsPerPage={row || 5}  // Optionally pass number of rows per page
                currentPage={page || 1}  // Optionally pass the current page
                totalRow={count}
                roleName = {roleName}
            />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2>Edit Department</h2>
                <div>
                    <div className="input-field">
                        <label htmlFor="departmentName">Department Name</label>
                        <InputField
                            type="text"
                            id="departmentName"  // Make sure the id matches the label's htmlFor
                            name="departmentName"
                            placeholder="Department Name"
                            value={departmentData.departmentName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="category">Category</label>
                        <InputField
                            type="text"
                            id="category"
                            name="category"
                            placeholder="Category"
                            value={departmentData.category}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="location">Location</label>
                        <InputField
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location"
                            value={departmentData.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="salary">Salary</label>
                        <InputField
                            type="number"
                            id="salary"
                            name="salary"
                            placeholder="Salary"
                            value={departmentData.salary}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="employee-assignment">
                    <h4>Assign Employees:</h4>
                    {employees?.map((employee) => (
                        <div key={employee._id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={employee.email}
                                    checked={departmentData.assignedEmployees.includes(employee.email)}
                                    onChange={handleEmployeeSelection}
                                />
                                {employee.email}
                            </label>
                        </div>
                    ))}
                </div>
                    <Button onClick={handleUpdate} style={{marginTop:"12px"}}>Update Department</Button>
                </div>
            </Modal>
        </>
    );
};

export default ViewDepartment;
