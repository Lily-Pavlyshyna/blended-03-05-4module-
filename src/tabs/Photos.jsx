import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import { ImageModal } from '../components/ImageModal/ImageModal';
const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { total_results, photos, per_page } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (alt, src) => {
    setIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {!images.length && !isEmpty && !error && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">❌Something went wrong</Text>}
      {isEmpty && (
        <Text textAlign="center">Sorry, there are no any images... 😭</Text>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;
