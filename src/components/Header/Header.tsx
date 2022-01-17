import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <header className="h-1/8 px-4 py-4 sm:px-8 md:px-8 lg:px-8 flex justify-end items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-5/6 sm:w-80 md:w-80 lg:w-120 h-8 p-2 bg-white rounded-md shadow"
      ></input>
    </header>
  );
};

export default Header;
