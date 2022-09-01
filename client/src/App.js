import Header from "../src/components/Header"
import Home from '../src/pages/Home'
import Results from '../src/pages/Results';
import Error from '../src/pages/Error';
import Tastes from '../src/pages/Tastes';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
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
