import React from 'react';
import PropTypes from 'prop-types';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
  const { searchvalue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512"
        viewBox="0 0 512 512"
        width="512"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeMiterlimit: '10',
            strokeWidth: '32px',
          }}
        />
        <line
          style={{
            fill: 'none',
            stroke: '#000',
            strokeMiterlimit: '10',
            strokeWidth: '32px',
          }}
          x1="338.29"
          x2="448"
          y1="338.29"
          y2="448"
        />
      </svg>
      <input
        value={searchvalue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchvalue && (
        <svg
          onClick={() => setSearchValue('')}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

Search.propTypes = {
  searchvalue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Search;