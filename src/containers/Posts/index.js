import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/constants";
import PostDetails from "../../components/PostDetails";
import { useQuery, useQueryClient } from "react-query";

const fetchPosts = async (pageNumber) => {
  const response = await fetch(
    `${API_BASE_URL}/posts?_limit=10&_page=${pageNumber}`
  );
  return response.json();
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const maxPage = 10; //assume

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", currentPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h4>Oops! Something went wrong!</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Blog&apos;em Ipsum</h1>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          {"    "}
          {currentPage}
          {"   "}
        </span>
        <button
          disabled={currentPage >= maxPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetails post={selectedPost} />}
    </div>
  );
};

export default Posts;
