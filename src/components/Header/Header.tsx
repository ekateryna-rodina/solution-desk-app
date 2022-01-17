import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-8">
      <div className="flex justify-between items-center">
        <Image
          className="mr-8"
          alt=""
          src="/assets/logo.svg"
          width={30}
          height={30}
        ></Image>
        <h1 className="ml-2 text-red-800 hidden sm:block md:block lg:block">
          SolutionDesk
        </h1>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-5/6 sm:w-80 md:w-80 lg:w-120 h-8 p-2 bg-white rounded-md shadow"
      ></input>
    </header>
  );
};

export default Header;
