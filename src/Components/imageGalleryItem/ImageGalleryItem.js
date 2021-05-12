import React from 'react'
// import { StyledImageGalleryItem } from './StyledImageGalleryItem';

const ImageGalleryItem = ({ image, getImage }) => {
    return (
        <>
            <li className="ImageGalleryItem">
                <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image" onClick={getImage} data-image={ image.largeImageURL}/>
            </li>
        </>
    );
}

export default ImageGalleryItem;