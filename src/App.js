import React, { Component } from "react";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { AlbumsListLoader } from "./AlbumListLoader";
import { AlbumDetailsLoader } from "./AlbumDetailsLoader";
import { NewAlbum } from "./NewAlbum";

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Router>
        <Grid padded>
          <Grid.Column>
            <Route path="/" exact component={NewAlbum} />
            <Route path="/" exact component={AlbumsListLoader} />
            <Route
              path="/albums/:albumId"
              render={() => (
                <div>
                  <NavLink to="/">Back to Albums list</NavLink>
                </div>
              )}
            />
            <Route
              path="/albums/:albumId"
              render={props => (
                <AlbumDetailsLoader id={props.match.params.albumId} />
              )}
            />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
