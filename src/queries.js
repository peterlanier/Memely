export const ListAlbums = `query ListAlbums {
    listAlbums(limit: 9999) {
        items {
            id
            name
        }
    }
  }`;

export const SubscribeToNewAlbums = `
    subscription OnCreateAlbum {
      onCreateAlbum {
        id
        name
      }
    }
  `;

export const GetAlbum = `query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      id
      name
    }
  }
  `;