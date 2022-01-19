import { GetServerSidePropsResult } from "next";
import clientPromise from "../lib/mongodb";
import { Layout } from "../src/components/Layout";
import { SearchUsers } from "../src/components/SearchUsers";

interface HomeProps {
  isConnected: boolean;
}
const Home = ({ isConnected }: any) => {
  return (
    <>
      <Layout>
        <SearchUsers />
      </Layout>
    </>
  );
};

export async function getServerSideProps(
  context: any
): Promise<GetServerSidePropsResult<HomeProps>> {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default Home;
