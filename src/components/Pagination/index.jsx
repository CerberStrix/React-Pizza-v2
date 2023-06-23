import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

Pagination.propTypes = {
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Pagination;
