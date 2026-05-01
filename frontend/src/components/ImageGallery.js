// // src/components/ImageGallery.js
// import React, { useState } from 'react';
// import { Image, Row, Col } from 'react-bootstrap';

// function ImageGallery({ images }) {
//   const [mainImage, setMainImage] = useState(images[0]);

//   return (
//     <div>
//       <Image src={mainImage} fluid rounded />
//       <Row className="mt-3">
//         {images.map((img, index) => (
//           <Col key={index} xs={3} onClick={() => setMainImage(img)}>
//             <Image src={img} thumbnail fluid style={{ cursor: 'pointer' }} />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default ImageGallery;


// src/components/ImageGallery.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageGallery.css'; // Optional: create this file for custom styles
import { processImageUrls, noImagePlaceholder } from '../utils/imageUtils';

const ImageGallery = ({ images }) => {
  const processedImages = processImageUrls(images);
  console.log('ImageGallery images prop:', images);
  console.log('ImageGallery processedImages:', processedImages);

  const safeImages = processedImages.length > 0
    ? processedImages
    : [noImagePlaceholder];

  if (processedImages.length === 0) {
    console.log('ImageGallery: no valid images, using placeholder');
  }

  return (
    <div className="image-template">
      <div className="image-frame">
        <Carousel indicators={safeImages.length > 1} controls={safeImages.length > 1}>
          {safeImages.map((image, index) => (
            <Carousel.Item key={index} className="image-carousel-item">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="image-template-img"
                onError={(e) => {
                  console.error('ImageGallery image failed:', e.currentTarget.src);
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = noImagePlaceholder;
                }}
                onLoad={() => console.log('ImageGallery image loaded:', image)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageGallery;
