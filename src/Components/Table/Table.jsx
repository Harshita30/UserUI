// src/Table.js
import React, { useEffect, useState } from 'react';
import './Table.css'
import axios from 'axios';

const Table = () => {
  // Sample data for the table
  // const data = [
  //   { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  //   { id: 2, name: 'Jane Smith', age: 34, city: 'London' },
  //   { id: 3, name: 'Sam Green', age: 23, city: 'Sydney' },
  //   { id: 4, name: 'Maria Johnson', age: 45, city: 'Toronto' },
  // ];

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);  // Set number of items per page
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('')


  // Fetch users data with pagination
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        params: { page, limit },
      });
      setUsers(response.data.data);
      setTotalUsers(response.data.totalUsers);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users');
      setLoading(false);
    }
  };


  // Fetch data when component mounts or page changes
   useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, limit]);  // Rerun when currentPage or limit changes

  const filteredData = users.filter((data) =>{
    return (data.name.toLowerCase().includes(searchQuery.toLowerCase()) || data.email.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  // Handle page change
  const handlePageChange = (page)=>{
    if(page< 1 || page>totalPages) return;
    setCurrentPage(page)
  }

  const handleLimitChange = (event)=>{
    setLimit(event.target.value)
    setCurrentPage(1);  // Reset to the first page when limit changes
  }

  const searchQueryHandler = (e) =>{
    setSearchQuery(e.target.value)
  }

  // console.log('users', users)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Users List <br/>(Pagination with Next and Previous Buttons, frontend search/filter feature)</h2>
      <input type='text' placeholder="Search by name or email..." value={searchQuery} onChange={searchQueryHandler}></input>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>EmailId</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ?
            (filteredData.map((user,i) => (
              <tr key={user._id}>
                <td>{i+1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="5" className="center-text">No results found</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={()=> handlePageChange(currentPage+1)} disabled={currentPage===totalPages}>Next</button>
      </div>
      <div>
        <label>Items per page:</label>
        <select value={limit} onChange={handleLimitChange} >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Table;
