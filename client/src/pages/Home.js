import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Transition,
  Segment,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

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
    <div className="ui container">
      <div className="ui stackable grid">
        <>
          {loading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <div className="post row">
                {/* <div className="ten wide mobile ten wide tablet ten wide computer column"> */}
                <div className="column">{user && <PostForm />}</div>
              </div>
              <div className="row">
                <div className="column fluid">
                  <Header />
                </div>
              </div>
              <Transition.Group>
                <div class="ui one column padded">
                  <div class="ui container">
                    {posts &&
                      posts.map((post) => (
                        <div class="column">
                          <div className="row">
                            <Grid.Column
                              key={post.id}
                              style={{ marginBottom: 20 }}
                            >
                              <PostCard post={post} />
                            </Grid.Column>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Transition.Group>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Home;
