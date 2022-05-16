import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query ($userId: String) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        email
        name
        posts {
          title
          content
          id
          published
          createdAt
        }
      }
    }
  }
`;

export default function Profile() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  console.log({ data, loading, error });

  // return <div>Still working around</div>;
  if (loading) return <div>Loading ...</div>;

  const {
    profile: {
      bio,
      isMyProfile,
      user: { email, name, posts },
    },
  } = data;
  console.log(isMyProfile);

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
        <div>{isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              content={post.content}
              date={post.createdAt}
              id={post.id}
              published={post.published}
              user={name}
              isMyProfile={isMyProfile}
              title={post.title}
            />
          );
        })}
      </div>
    </div>
  );
}
