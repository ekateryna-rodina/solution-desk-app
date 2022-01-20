import { getAllUsers, solutionDeskApi } from "../src/app/solutionDeskApi";
import { wrapper } from "../src/app/store";
import { Layout } from "../src/components/Layout";
import { SearchUsers } from "../src/components/SearchUsers";

const Home = ({ initialReduxState }: any) => {
  const cached = solutionDeskApi.endpoints.getAllUsers.select({
    page: "1",
    limit: "3",
  })(initialReduxState); // access the cache
  const { data: result, status, error } = cached;

  return (
    <>
      <Layout>
        <SearchUsers paginatedData={result} />
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllUsers.initiate({ page: "1", limit: "3" }));
    await Promise.all(solutionDeskApi.util.getRunningOperationPromises());

    return {
      props: {
        initialReduxState: store.getState(),
      },
    };
  }
);
export default Home;
