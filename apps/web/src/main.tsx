import React from "react"

import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./app"
import { Toaster } from "./components/atoms/toaster"
import { client } from "./lib/repositories"

import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ApolloProvider>
  </BrowserRouter>
</React.StrictMode>)
