import photoService from "../services/photoService";
import { Spin } from "antd";
import "./Gallery.css";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getPhotos = async (value, currentPage) => {
    setIsLoading(true);
    if (value) {
      const data = await photoService.searchPhotos(value, currentPage);
      setPhotos([...photos, ...data.results]);
    } else {
      const data = await photoService.getPhotos(currentPage);
      setPhotos([...photos, ...data]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPhotos(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const handleSearch = (value) => {
    setSearchValue(value);
    setPhotos([]);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (isLoading) return;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPage(currentPage + 1);
      getPhotos(searchValue, currentPage);
    }
  };

  return (
    <div className="wrapper">
      <Search
        placeholder="input search text"
        onSearch={handleSearch}
        enterButton
        className="search"
      />

      <div className="gallery" onScroll={handleScroll} role="presentation">
        {photos.map((photo) => (
          <div key={photo.id} className="image-wrapper">
            <img src={photo.urls.raw} alt="" className="image" />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="loading">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Gallery;
