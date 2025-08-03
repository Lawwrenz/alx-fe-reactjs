const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.name || user.login}
            </a>
          </h3>
          <p className="text-gray-600">@{user.login}</p>
          
          {user.bio && (
            <p className="text-gray-500 mt-2 text-sm line-clamp-2">{user.bio}</p>
          )}
          
          {user.location && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="font-semibold">{user.public_repos || 0}</div>
          <div className="text-gray-500">Repos</div>
        </div>
        <div>
          <div className="font-semibold">{user.followers || 0}</div>
          <div className="text-gray-500">Followers</div>
        </div>
        <div>
          <div className="font-semibold">{user.following || 0}</div>
          <div className="text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;