import {
  getAllUsers,
  getFilters,
  solutionDeskApi,
} from "../src/app/solutionDeskApi";
import { wrapper } from "../src/app/store";
import { Layout } from "../src/components/Layout";
import { SearchUsers } from "../src/components/SearchUsers";

const Home = ({ initialReduxState }: any) => {
  return (
    <>
      <Layout>
        <SearchUsers />
      </Layout>
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
