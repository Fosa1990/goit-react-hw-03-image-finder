import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { infoOptions } from '../../helpers/toastyOptions';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { query: '' };

  handleChange = event => {
    this.setState({
      query: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    event.preventDefault();

    if (query.trim() === '') {
      toast.info('Write something! Your Majesty', infoOptions);
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={styles.Search}>
        <form className={styles.Search__form} onSubmit={this.handleSubmit}>
          <button className={styles.Search__button} type="submit">
            <span className={styles.Search__label}>Search</span>
          </button>

          <input
            name="form_input"
            value={query}
            onChange={this.handleChange}
            className={styles.Search__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="What are we looking for? Your Majesty"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
