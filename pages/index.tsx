import { useAppSelector } from "../src/app/hooks";
import {
  getAllUsers,
  getFilters,
  solutionDeskApi,
} from "../src/app/solutionDeskApi";
import { wrapper } from "../src/app/store";
import { Layout } from "../src/components/Layout";
import { SearchUsers } from "../src/components/SearchUsers";

const Home = ({ initialReduxState }: any) => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <>
      <Layout>
        <SearchUsers />
      </Layout>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-slate-400 transition ease-in-out ${
          isNavigating ? "opacity-50 z-0" : "opacity-0 -z-10"
        }`}
      ></div>
      {/* Add New Popup */}
      {/* <div className="absolute right-0 top-0 bottom-0 top-15 bg-white shadow w-full md:w-6/12"></div> */}
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
