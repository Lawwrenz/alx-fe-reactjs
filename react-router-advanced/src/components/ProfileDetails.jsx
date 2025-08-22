import { useAuth } from '../context/AuthContext'

const ProfileDetails = () => {
  const { user } = useAuth()
  
  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="details-card">
        <p><strong>Username:</strong> {user?.username || 'N/A'}</p>
        <p><strong>Email:</strong> {user?.username ? `${user.username}@example.com` : 'N/A'}</p>
        <p><strong>Member since:</strong> January 2023</p>
      </div>
    </div>
  )
}

export default ProfileDetails