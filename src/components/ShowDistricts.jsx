const ShowDistricts = ({ districts }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-4/5 md:w-2/3 bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {districts.length &&
          districts.map((district, index) => (
            <ol key={district.id}>
              <li>
                {index + 1}. {district.district_name}
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default ShowDistricts;
