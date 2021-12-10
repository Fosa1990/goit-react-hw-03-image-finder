import React, { Component, Fragment } from 'react';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Gallery from './components/Gallery';
import LoaderSpinner from './components/Loader';
import Section from './components/Section';
import Modal from './components/Modal';
import imagesApi from './services/galleryApi';

export class App extends Component {
  state = {
    gallery: [],
    isLoading: false,
    currentPage: 1,
    search: '',
    error: null,
    selectedImageURL: '',
    isModalOpen: false, // false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) this.fetchPictures();
  }

  fetchPictures = () => {
    const { search, currentPage } = this.state;

    this.setState({ isLoading: true });

    imagesApi(search, currentPage)
      .then(images => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.onLoadMoreButtonClick();
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = query => {
    if (query !== this.state.search) {
      this.setState({
        gallery: [],
        search: query,
        currentPage: 1,
        error: null,
      });
    }
  };

  onLoadMoreButtonClick = () => {
    if (this.state.currentPage > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  handleImageClick = event => {
    console.log('e.t: ', event);

    if (event.target.nodeName !== 'IMG') {
      return;
    }

    event.preventDefault();

    const fullImageLink = event.target.getAttribute('data-large');
    const lowImageLink = event.target.getAttribute('src');

    this.setState({
      selectedImageURL: fullImageLink,
      selectedLowImgURL: lowImageLink,
      isModalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const {
      search,
      gallery,
      isLoading,
      selectedImageURL,
      isModalOpen,
      selectedLowImgUrl,
    } = this.state;

    return (
      <Fragment>
        <Searchbar onSubmit={this.handleSubmit} />

        {isLoading && (
          <Section>
            <LoaderSpinner />
          </Section>
        )}

        {search && (
          <Gallery gallery={gallery} onClick={this.handleImageClick} />
        )}

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img
              src={selectedLowImgUrl}
              data-src={selectedImageURL}
              alt="fullsize of images"
            />
          </Modal>
        )}

        <Section>
          {!isLoading && search && <Button onClick={this.fetchPictures} />}
        </Section>
      </Fragment>
    );
  }
}

export default App;
