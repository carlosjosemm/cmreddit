import { NavBar } from "../components/NavBar"
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  
  return (
  <NavBar>
    <div className="app">new blank app</div>
  </NavBar>)
}

export default withUrqlClient(createUrqlClient)(Index);
