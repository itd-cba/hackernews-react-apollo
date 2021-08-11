import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import {setContext} from "@apollo/client/link/context";


// 1
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

// 2
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYyODY4NzcwMX0.uoObYI-dt5zkGIDUbZ2IoANZYbh-wTExH2qx6wMHRFM',
        }
    }
});
// 3
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// 4
ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
