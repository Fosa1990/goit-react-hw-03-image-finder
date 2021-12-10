// Компонент принимает один проп onSubmit - функцию
// для передачи значения инпута при сабмите формы.
// Создает DOM - элемент следующей структуры.
import React, { Component } from 'react';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    const { query } = this.state;
    event.preventDefault();

    if (!query) {
      error('Search field is empty!');
      return;
    }

    this.props.onSubmit(query);
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
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
