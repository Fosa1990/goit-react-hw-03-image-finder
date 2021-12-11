import React, { Component, Fragment } from 'react';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Gallery from './components/Gallery';
import LoaderSpinner from './components/Loader';
import Section from './components/Section';
import Modal from './components/Modal';
import API from './services/galleryApi';
import {
  warningOptions,
  errorOptions,
  infoOptions,
} from './helpers/toastyOptions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        if (!images) {
          toast.error('No such results! Your Majesty', errorOptions);
          return;
        }

        if (images.length > 1) {
          toast.info('Found! Your Majesty', infoOptions);
        }

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

    if (!query) {
      const notify = () =>
        toast.warn('Search field is empty! Your Majesty', warningOptions);
      notify();
      return;
    }
  };

  onLoadMoreButtonClick = () => {
    if (this.state.currentPage > 2) {
      const options = {
        top: null,
        behavior: 'smooth',
      };

      options.top = window.pageYOffset + document.documentElement.clientHeight;
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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          draggable
          draggablePercent={60}
        />

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
          {search && gallery.length > 11 && (
            <Button onClick={this.fetchPictures} />
          )}
        </Section>
      </Fragment>
    );
  }
}

export default App;
