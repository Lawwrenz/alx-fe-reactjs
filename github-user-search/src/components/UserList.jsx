import UserCard from './UserCard';

const UserList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No users found. Try a different search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;