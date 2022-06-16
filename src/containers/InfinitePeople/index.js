import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import PersonCard from "../../components/PersonCard";
import { SWAPI_URL } from "../../utils/constants";

const fetchPeople = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const InfinitePeople = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFeching,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = SWAPI_URL }) => fetchPeople(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h4>Oops! Something went wrong!</h4>
        <p>{error.toString()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>InfinitePeople</h2>
      {isFeching && <div>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <div key={person.name}>
                <PersonCard {...person} />
              </div>
            );
          });
        })}
      </InfiniteScroll>
    </div>
  );
};

export default InfinitePeople;
