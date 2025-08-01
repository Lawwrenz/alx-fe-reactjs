 import React, { useContext } from 'react';
 import UserContext from './UserContext';
 
 const UserProfile = (props) => {
  const { name, age, bio } = useContext(UserContext);
   return (
     <div className="user-profile">
       <h2>{name}</h2>
       <p>Age: {props.age}</p>
       <p>Bio: {props.bio}</p>
     </div>
   );
 };

 export default UserProfile;