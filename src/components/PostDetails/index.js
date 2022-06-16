import React from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useQuery, useMutation } from "react-query";

const deletePost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/postId/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
const updatePost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/postId/${id}`, {
    method: "PATCH",
    data: { title: "React query updated..." },
  });
  return response.json();
};

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

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

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
      <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the post...</p>
      )}
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error while deleting post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been deleted!</p>
      )}

      <button onClick={() => updateMutation.mutate(id)}>Update title</button>
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Updating the post...</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error while updating post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been updated!</p>
      )}
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
