import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

  const albums = [
    {
      id: 'usmanka-fit-2022',
      title: 'Усманка Фит',
      year: '2022',
      coverImage: `${process.env.PUBLIC_URL}/images/Gallery/2022/photo_5377838193702976534_y.jpg`,
      photosCount: 43,
      videosCount: 10,
      color: '#2196F3'
    }
    // Здесь можно добавить больше альбомов
  ];

  const handleAlbumClick = (albumId) => {
    navigate(`/gallery/${albumId}`);
  };

  return (
    <div className="gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1 className="gallery-title">Галерея</h1>
          <p className="gallery-description">
            Фотографии и видео с наших туров
          </p>
        </div>

        <div className="albums-grid">
          {albums.map((album) => (
            <div
              key={album.id}
              className="album-card"
              onClick={() => handleAlbumClick(album.id)}
              style={{ borderColor: album.color }}
            >
              <div 
                className="album-cover"
                style={{ 
                  backgroundImage: `url(${album.coverImage})`,
                  backgroundColor: album.color
                }}
              >
                <div className="album-overlay">
                  <div className="album-icon" style={{ background: album.color }}>
                    <i className="fas fa-images"></i>
                  </div>
                </div>
              </div>
              <div className="album-info">
                <h3 className="album-title">{album.title}</h3>
                <span className="album-year">{album.year}</span>
                <div className="album-stats">
                  <span className="stat">
                    <i className="fas fa-camera"></i>
                    {album.photosCount} фото
                  </span>
                  <span className="stat">
                    <i className="fas fa-video"></i>
                    {album.videosCount} видео
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
