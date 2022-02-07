import { useAppSelector } from "../src/app/hooks";
import {
  getAllUsers,
  getFilters,
  solutionDeskApi,
} from "../src/app/solutionDeskApi";
import { wrapper } from "../src/app/store";
import { AddNewUser } from "../src/components/AddNewUser";
import { Layout } from "../src/components/Layout";
import { SearchUsers } from "../src/components/SearchUsers";

const Home = ({ initialReduxState }: any) => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  const { isAddNewShown } = useAppSelector((state) => state.addNewUser);
  return (
    <>
      <Layout>
        <SearchUsers />
      </Layout>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-slate-400 transition ease-in-out ${
          isNavigating || isAddNewShown ? "opacity-50" : "opacity-0 -z-10"
        } ${isAddNewShown ? "z-20" : ""}`}
      ></div>
      {/* Add New Popup */}
      <div
        className={`absolute inset-8 lg:left-[50%] lg:inset-y-0 lg:right-0 lg:w-6/12 bg-white shadow z-30 transition ease-in-out ${
          isAddNewShown ? "translate-0" : "translate-x-full"
        }`}
      >
        <AddNewUser />
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(
      getAllUsers.initiate({
        page: "1",
        limit: "7",
        filter: encodeURIComponent(JSON.stringify([])),
        order: "1",
        column: "lastName",
        search: "",
      })
    );
    await store.dispatch(getFilters.initiate({}));
    await Promise.all(solutionDeskApi.util.getRunningOperationPromises());
    return {
      props: {
        initialReduxState: store.getState(),
      },
    };
  }
);
export default Home;
