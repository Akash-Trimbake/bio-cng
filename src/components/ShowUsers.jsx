const ShowUsers = ({ users }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full overflow-auto">
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {users.length &&
          users.map((user, index) => (
            <ol key={user.id}>
              <li>
                {index + 1}. {user.username}
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default ShowUsers;
