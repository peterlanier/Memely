import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Header, Input, Segment } from "semantic-ui-react";

export class NewAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: ""
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async event => {
    event.preventDefault();
    const NewAlbum = `mutation NewAlbum($name: String!) {
            createAlbum(input: {name: $name}) {
                id
                name
            }
        }`;
    try {
      const result = await API.graphql(
        graphqlOperation(NewAlbum, { name: this.state.albumName })
      );
      console.info(`Created album with id ${result.data.createAlbum.id}`);
      this.setState({ albumName: "" });
    } catch (err) {
      console.error("NewAlbum mutation failed", err);
    }
  };

  render() {
    return (
      <Segment>
        <Header as="h3">Add a new album</Header>
        <Input
          type="text"
          placeholder="New Album Name"
          icon="plus"
          iconPosition="left"
          action={{ content: "Create", onClick: this.handleSubmit }}
          name="albumName"
          value={this.state.albumName}
          onChange={this.handleChange}
        />
      </Segment>
    );
  }
}
