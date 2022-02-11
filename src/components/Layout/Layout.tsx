import { Header } from "../Header";
import { Logo } from "../Logo";
import { Navigation } from "../Navigation";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-slate-100 h-full relative">
      <div className="absolute top-4 left-8 z-20">
        <Logo />
      </div>
      <Header />
      <main>{children}</main>
      <Navigation />
      <footer className="h-1/8 fixed bottom-0 left-0 right-0 bg-white flex justify-center align-middle p-4">
        This is footer
      </footer>
    </div>
  );
};

export default Layout;
