// src/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);  // Set number of items per page
  const [search, setSearch] = useState('');  // Set number of items per page
  const [filterClicked, setFilterClicked] = useState(false);

  // Fetch users data with pagination
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        params: { page, limit, search },
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
        setFilterClicked(false); // Reset filter flag after fetching data
  }, [currentPage, limit, filterClicked]);  // Rerun when currentPage or limit changes, add search in the dependency when you want to search on the basis on search text changes

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;  // Don't allow out-of-range pages
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setCurrentPage(1);  // Reset to the first page when limit changes
  };

  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }

  const handleFilterClick = () =>{
    setFilterClicked(true)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        
    <h2>Users List <br/>(Pagination with Page Number, backend search/filter feature)</h2>
    <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <button onClick={handleFilterClick} style={{ marginBottom: '10px', padding: '5px' }}>
        Filter
      </button>
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
          {users.map((user,i) => (
            <tr key={user._id}>
              <td>{i+1}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {/* Pagination Controls */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Page Numbers */}
        <span> Pages: </span>
        {[...Array(totalPages).keys()].map((index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? 'lightblue' : 'white',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>

        {/* Items per page selector */}
        <div>
          <label>Items per page:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Users;