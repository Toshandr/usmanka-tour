import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AlbumView.css';

const AlbumView = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('all'); // all, photos, videos

  // Генерируем список всех фото и видео
  const generateMedia = () => {
    const media = [];
    let id = 1;
    
    // Добавляем все фотографии
    const photos = [
      'photo_5377768675362324413_y.jpg', 'photo_5377768675362324414_y.jpg', 'photo_5377768675362324415_y.jpg',
      'photo_5377768675362324416_y.jpg', 'photo_5377768675362324417_y.jpg', 'photo_5377768675362324419_y.jpg',
      'photo_5377768675362324422_y.jpg', 'photo_5377768675362324423_y.jpg', 'photo_5377768675362324424_y.jpg',
      'photo_5377768675362324425_y.jpg', 'photo_5377768675362324426_y.jpg', 'photo_5377768675362324427_y.jpg',
      'photo_5377768675362324428_y.jpg', 'photo_5377838193702976514_y.jpg', 'photo_5377838193702976515_y.jpg',
      'photo_5377838193702976516_y.jpg', 'photo_5377838193702976517_y.jpg', 'photo_5377838193702976518_y.jpg',
      'photo_5377838193702976521_y.jpg', 'photo_5377838193702976522_y.jpg', 'photo_5377838193702976523_y.jpg',
      'photo_5377838193702976524_y.jpg', 'photo_5377838193702976525_y.jpg', 'photo_5377838193702976526_y.jpg',
      'photo_5377838193702976527_y.jpg', 'photo_5377838193702976528_y.jpg', 'photo_5377838193702976529_y.jpg',
      'photo_5377838193702976530_y.jpg', 'photo_5377838193702976531_y.jpg', 'photo_5377838193702976532_y.jpg',
      'photo_5377838193702976533_y.jpg', 'photo_5377838193702976534_y.jpg', 'photo_5377838193702976535_y.jpg',
      'photo_5377838193702976537_y.jpg', 'photo_5377838193702976538_y.jpg', 'photo_5377838193702976539_y.jpg',
      'photo_5377838193702976540_y.jpg', 'photo_5377838193702976541_y.jpg', 'photo_5377838193702976542_y.jpg',
      'photo_5377838193702976543_y.jpg', 'photo_5377838193702976544_y.jpg', 'photo_5377838193702976545_y.jpg',
      'photo_5377838193702976547_y.jpg'
    ];
    
    photos.forEach(photo => {
      media.push({
        id: id++,
        type: 'photo',
        url: `${process.env.PUBLIC_URL}/images/Gallery/2022/${photo}`,
        thumbnail: `${process.env.PUBLIC_URL}/images/Gallery/2022/${photo}`
      });
    });
    
    // Добавляем все видео
    const videos = [
      'document_5377768674906086687.mp4', 'document_5377768674906086688.mp4', 'document_5377768674906086689.mp4',
      'document_5377768674906086693.mp4', 'document_5377768674906086696.mp4', 'document_5377768674906086697.mp4',
      'document_5377768674906086706.mp4', 'document_5377768674906086707.mp4', 'document_5377838193246739917.mp4',
      'document_5377838193246739918.mp4'
    ];
    
    videos.forEach(video => {
      media.push({
        id: id++,
        type: 'video',
        url: `${process.env.PUBLIC_URL}/images/Gallery/2022/${video}`,
        thumbnail: `${process.env.PUBLIC_URL}/images/Gallery/2022/photo_5377768675362324413_y.jpg` // Используем первое фото как превью
      });
    });
    
    return media;
  };

  // Данные альбома
  const albumData = {
    'usmanka-fit-2022': {
      title: 'Усманка Фит',
      year: '2022',
      description: 'Фитнес уикенд на природе: йога, тренировки и активный отдых',
      color: '#2196F3',
      media: generateMedia()
    }
  };

  const album = albumData[albumId];

  if (!album) {
    return (
      <div className="album-view-page">
        <div className="container">
          <h2>Альбом не найден</h2>
          <button onClick={() => navigate('/gallery')} className="back-btn">
            Вернуться к галерее
          </button>
        </div>
      </div>
    );
  }

  const filteredMedia = album.media.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'photos') return item.type === 'photo';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="album-view-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/gallery')}>
          <i className="fas fa-arrow-left"></i>
          Назад к галерее
        </button>

        <div className="album-view-header">
          <div className="album-view-icon" style={{ background: album.color }}>
            <i className="fas fa-images"></i>
          </div>
          <div>
            <h1 className="album-view-title">{album.title}</h1>
            <span className="album-view-year">{album.year}</span>
          </div>
        </div>

        <p className="album-view-description">{album.description}</p>

        <div className="media-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <i className="fas fa-th"></i>
            Все ({album.media.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'photos' ? 'active' : ''}`}
            onClick={() => setFilter('photos')}
          >
            <i className="fas fa-camera"></i>
            Фото ({album.media.filter(m => m.type === 'photo').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'videos' ? 'active' : ''}`}
            onClick={() => setFilter('videos')}
          >
            <i className="fas fa-video"></i>
            Видео ({album.media.filter(m => m.type === 'video').length})
          </button>
        </div>

        <div className="media-grid">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="media-item"
              onClick={() => handleMediaClick(item)}
            >
              <div 
                className="media-thumbnail"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
              >
                {item.type === 'video' && (
                  <div className="video-overlay">
                    <i className="fas fa-play-circle"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="no-media">
            <i className="fas fa-images"></i>
            <p>Нет медиа файлов в этой категории</p>
          </div>
        )}
      </div>

      {selectedMedia && (
        <div className="media-modal" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'photo' ? (
              <img src={selectedMedia.url} alt="Фото" className="modal-image" />
            ) : (
              <div className="modal-video">
                <video controls autoPlay className="video-player">
                  <source src={selectedMedia.url} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumView;
