import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';
const PhotosGallery = ({ images, openModal }) => {
  console.log(images);
  return (
    <Grid>
      {images.map(({ id, alt, avg_color, src }) => (
        <GridItem key={id}>
          <PhotosGalleryItem
            alt={alt}
            avg_color={avg_color}
            src={src}
            openModal={openModal}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PhotosGallery;
