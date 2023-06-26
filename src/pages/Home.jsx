/* eslint-disable multiline-ternary */
import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeCategoryId,
  changeSortType,
  changePageCount,
  setFilters,
} from '../redux/slices/filterSlice.js';
import { fetchPizzas } from '../redux/slices/pizzasSlice.js';
import PropTypes from 'prop-types';
import { SearchContext } from '../App';

import { Categories } from '../components/Categories';
import PizzaBlock from '../components/Pizzablock';
import { Sort } from '../components/Sort';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filters);
  const { items, loadingStatus } = useSelector((state) => state.pizzas);
  const { searchvalue } = React.useContext(SearchContext);

  const filteredPizzas = items
    .filter((items) => items.title.toLowerCase().includes(searchvalue.toLowerCase()))
    .map((obj, i) => <PizzaBlock key={i} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        currentPage,
      }),
    );
  };

  const onChangeCategory = (id) => {
    dispatch(changeCategoryId(id));
  };

  const onChangeSort = (obj) => {
    dispatch(changeSortType(obj));
  };

  const onPageChange = (count) => {
    dispatch(changePageCount(count));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage, searchvalue]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchvalue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={onChangeCategory} />
        <Sort value={sort} onChange={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {loadingStatus === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {loadingStatus !== 'success' ? skeletons : filteredPizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  );
};

Home.propTypes = {
  searchvalue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Home;
