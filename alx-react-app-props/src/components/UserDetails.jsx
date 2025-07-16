import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
function UserDetails() {
    const userData = useContext(userContext);
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;