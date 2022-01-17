import { Header } from "../Header";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-slate-100 h-5/6">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
