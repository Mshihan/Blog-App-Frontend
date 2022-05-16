import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      content
      createdAt
      title
      id
      published
      user {
        email
        name
        id
        password
      }
    }
  }
`;

export default function Posts() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went really wrong...</div>;

  const { posts } = data;

  console.log(posts);

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            content={post.content}
            title={post.title}
            date={post.createdAt}
            id={post.id}
            key={post.id}
            published={post.published}
            user={post.user.name}
          />
        );
      })}
    </div>
  );
}
