import React, { useState } from "react";
import { API_BASE_URL } from "../../utils/constants";
import PostDetails from "../PostDetails";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=10&_page=0`);
  return response.json();
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  //replace with useQuery
  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts);

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
        <button disabled onClick={() => {}}>
          Previous
        </button>
        <span>
          {"    "}
          {currentPage + 1}
          {"   "}
        </span>
        <button disabled onClick={() => {}}>
          Next
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetails post={selectedPost} />}
    </div>
  );
};

export default Posts;
