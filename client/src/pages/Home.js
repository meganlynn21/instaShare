import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import Spinner from "../components/Spinner";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="ui grid">
      <div className="ui container">
        <>
          {loading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <div class="flex-container">
                <div class="flex-child magenta" id="left">
                  <div className="alignLeft form-container ui stackable container">
                    {user && (
                      <Grid.Column>
                        <PostForm />
                      </Grid.Column>
                    )}
                  </div>
                </div>
                <div class="flex-child green" id="right">
                  <div className="form-container ui stackable container">
                    <Header />
                  </div>
                  <Transition.Group>
                    {posts &&
                      posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} />
                        </Grid.Column>
                      ))}
                  </Transition.Group>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Home;
