import { useAppSelector } from "../../app/hooks";
import { Search } from "../Search";

const Header = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <header className="h-1/8 px-4 py-4 sm:px-8 md:px-8 lg:px-8 flex justify-end items-center">
      <Search />
    </header>
  );
};

export default Header;
