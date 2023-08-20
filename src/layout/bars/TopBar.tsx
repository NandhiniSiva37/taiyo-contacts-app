import { useSelector } from "react-redux";

function TopBar() {
  const titleString = useSelector((state: any) => state.title.title);
  return (
    <div className="bg-btnBlue text-blue">
      <div className="flex justify-center items-center h-14 px-4 md:px-6 lg:px-10">
        <div className="text-xl font-bold">{titleString}</div>
      </div>
    </div>
  );
}

export default TopBar;
