const ShowTaluka = ({ talukas }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {talukas.length &&
          talukas.map((taluka, index) => (
            <ol key={taluka.id}>
              <li>
                {index + 1}. {taluka.sub_district_name}
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default ShowTaluka;
