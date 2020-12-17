import { NavBar } from "../components/NavBar"
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
  <NavBar />
    <div className="app">New blank app</div>
    {!data ? <div>Loading posts</div> : data.posts.map((post) => <div key={post.id} >{post.title}</div>) }
  </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
