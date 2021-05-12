import React, { Component} from 'react'
import axios from 'axios'
import ImageGallery from './imageGallery/ImageGallery'
import Button from './button/Button'
import Searchbar from './searchbar/Searchbar'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
import Modal from './modal/Modal'

class Gallery extends Component {

    state = {
        images: [],
        page: 1,
        searchQuery: '',
        loading: false,
        showModal: false,
        largeImageURL: '',
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery || 
            prevState.page !== this.state.page) {
            this.fetchPictures()
        } 
    }
    
    fetchPictures = async () => {
        const { searchQuery, page, loading } = this.state
        this.setState({ loading: true });

        try {
            const { data } = await axios.get(
                `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=21141411-eb823bafbda7b049277559c1c&image_type=photo&orientation=horizontal&per_page=12`
            )
                this.setState((prevState) => ({
                    images: [...prevState.images, ...data.hits],
                }));

        }
        catch (error) {
            console.log(error);
        }
        finally {
            this.setState({ loading: false })
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    }

    handlerForm = (query) => {this.setState({searchQuery: query, page: 1, images: []});
    }
    

    onLoadMore = () => {
        this.setState((prevState) => ({page: prevState.page + 1}))
    }

    getImage = evt => {
        this.setState({
            largeImageURL: evt.target.dataset.image
        });
        this.toggleModal();
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
    };

    

    render() {
        const { images, loading, showModal, largeImageURL } = this.state;
        const { handlerForm, onLoadMore, getImage,toggleModal } = this;
        
        return (
            <>
                <Searchbar onSubmit={handlerForm} />

                <ImageGallery images={images} getImage={getImage} />
                { loading && <Loader />  }

                {images.length > 0 && 
                    <Button onClick={onLoadMore}/>
                }
                <Modal open={showModal} onClose={toggleModal} largeImageURL={largeImageURL} />
            </>
        );
    }
}

export default Gallery;