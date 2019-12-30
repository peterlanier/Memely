import React from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { GetAlbum } from "./queries";
import AlbumDetails from "./AlbumDetails";

export class AlbumDetailsLoader extends React.Component {
    render() {
      return (
        <Connect query={graphqlOperation(GetAlbum, { id: this.props.id })}>
          {({ data, loading, errors }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (errors.length > 0) {
              return <div>{JSON.stringify(errors)}</div>;
            }
            if (!data.getAlbum) return;
            return <AlbumDetails album={data.getAlbum} />;
          }}
        </Connect>
      );
    }
  }