import React, { Component, Fragment } from 'react';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Gallery from './components/Gallery';
import LoaderSpinner from './components/Loader';
import Section from './components/Section';
import Modal from './components/Modal';
import API from './services/galleryApi';

export class App extends Component {
  state = {
    gallery: [],
    isLoading: false,
    currentPage: 1,
    search: '',
    error: null,
    selectedBigImageURL: '',
    selectedLowImageURL: '',
    altImageTitle: '',
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) this.fetchPictures();
  }

  fetchPictures = () => {
    const { search, currentPage } = this.state;

    this.setState({ isLoading: true });

    API(search, currentPage)
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
    const options = {
      top: window.pageYOffset + document.documentElement.scrollHeight,
      behavior: 'smooth',
    };

    if (this.state.currentPage > 2) {
      setTimeout(() => {
        window.scrollTo(options);
      }, 1000);
    }
  };

  handleImageClick = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    event.preventDefault();

    const fullImageLink = event.target.getAttribute('data-large');
    const lowImageLink = event.target.getAttribute('src');
    const altImageTitle = event.target.getAttribute('alt');

    this.setState({
      selectedBigImageURL: fullImageLink,
      selectedLowImageURL: lowImageLink,
      isModalOpen: true,
      altImageTitle: altImageTitle,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });

    if (this.state.isModalOpen) {
      document.body.style.overflowY = 'hidden';
    }
  };

  render() {
    const {
      search,
      gallery,
      isLoading,
      selectedBigImageURL,
      isModalOpen,
      selectedLowImageURL,
      altImageTitle,
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
              src={selectedLowImageURL}
              data-src={selectedBigImageURL}
              alt={altImageTitle}
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
