import styles from './PhotosGalleryItem.module.css';
const PhotosGalleryItem = ({ alt, avg_color, src, openModal }) => {
  console.log(src.large, alt);
  return (
    <div
      className={styles.thumb}
      style={{ backgroundColor: avg_color, borderColor: avg_color }}
    >
      <img
        src={src.large}
        alt={alt}
        onClick={() => openModal(src.large, alt)}
      />
    </div>
  );
};
export default PhotosGalleryItem;
