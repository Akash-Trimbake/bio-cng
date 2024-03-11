const ShowUsers = ({ users }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {users.length &&
          users.map((user) => (
            <ol key={user.id}>
              <li>
                {user.id}. {user.username}
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default ShowUsers;
