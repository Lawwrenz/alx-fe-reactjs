const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.login}
            </a>
          </h3>
          {user.name && <p className="text-gray-600">{user.name}</p>}
          {user.bio && <p className="text-gray-500 mt-1">{user.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;