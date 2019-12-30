import React from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { ListAlbums, SubscribeToNewAlbums } from "./queries.js"
import AlbumsList from './AlbumList';

export class AlbumsListLoader extends React.Component {
    onNewAlbum = (prevQuery, newData) => {
      let updatedQuery = Object.assign({}, prevQuery);
      updatedQuery.listAlbums.items = prevQuery.listAlbums.items.concat([
        newData.onCreateAlbum
      ]);
      return updatedQuery;
    };
  
    render() {
      return (
        <Connect
          query={graphqlOperation(ListAlbums)}
          subscription={graphqlOperation(SubscribeToNewAlbums)}
          onSubscriptionMsg={this.onNewAlbum}
        >
          {({ data, loading, errors }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (!data.listAlbums) return;
  
            return <AlbumsList albums={data.listAlbums.items} />;
          }}
        </Connect>
      );
    }
  }