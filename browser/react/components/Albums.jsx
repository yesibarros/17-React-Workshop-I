import React from 'react';

export default ({ albums, selectAlbum }) => (
  <div className="albums">
    <h3>Albums</h3>
    <div className="row">
      {albums.map(album => (
        <div key={album.id} className="col-xs-4">
          <a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>
            <img src={album.imageUrl} />
            <div className="caption">
              <h5>
                <span>{album.name}</span>
              </h5>
              <small>{album.songs.length} songs</small>
            </div>
          </a>
        </div>
      ))}
    </div>
  </div>
);