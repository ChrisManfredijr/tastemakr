

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import { setContext } from '@apollo/client/link/context'
import Header from "./components/Header/index";
import Home from './pages/Home';
import Results from './pages/Results';
import Error from './pages/Error';
import Tastes from './pages/Tastes';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/results" element={<Results/>}/> 
          <Route path='/tastes' element={<Tastes/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>  
      </Router>
    </div>
    </ApolloProvider>
    

  );
}

export default App;
