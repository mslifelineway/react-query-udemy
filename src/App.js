import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import InfinitePeople from "./containers/InfinitePeople";
import Posts from "./containers/Posts";

const queryClient = new QueryClient();

function App() {
  const [isPosts, setIsPosts] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button onClick={() => setIsPosts(true)}>Posts</button>{" "}
        <button onClick={() => setIsPosts(false)}>InfinitePeople</button>
      </div>
      {isPosts ? <Posts /> : <InfinitePeople />}

      {/* REMOVE ON PRODUCTION */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
