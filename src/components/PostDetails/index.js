import React from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useQuery } from "react-query";

const PostDetails = ({ post }) => {
  const { id, title, body } = post;

  const fetchComments = async () => {
    const response = await fetch(`${API_BASE_URL}/comments?postId=${id}`);
    return response.json();
  };

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery(["comments", id], fetchComments);

  const deletePost = async () => {
    const response = await fetch(`${API_BASE_URL}/postId/${id}`, {
      method: "DELETE",
    });
    return response.json();
  };
  const updatePost = async () => {
    const response = await fetch(`${API_BASE_URL}/postId/${id}`, {
      method: "PATCH",
      data: { title: "React query updated..." },
    });
    return response.json();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Oops! Something went wrong <br /> <small>{error?.toString()}</small>
      </p>
    );
  }
  return (
    <div>
      <h3 style={{ color: "blue" }}>{title}</h3>
      <button onClick={deletePost}>Delete</button>
      <button onClick={updatePost}>Update title</button>
      <p>{body}</p>
      <h4>Comments:</h4>
      <ul>
        {comments.map(({ id, email, body }) => (
          <li key={id}>
            {email}: {body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
