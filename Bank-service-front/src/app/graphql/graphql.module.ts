import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:8080/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GraphqlModule { }

