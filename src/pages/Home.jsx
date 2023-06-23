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
import PropTypes from 'prop-types';
import { SearchContext } from '../App';

import { Categories } from '../components/Categories';
import PizzaBlock from '../components/Pizzablock';
import { Sort } from '../components/Sort';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filters);
  const { searchvalue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const filteredPizzas = pizzas
    .filter((items) => items.title.toLowerCase().includes(searchvalue.toLowerCase()))
    .map((obj, i) => <PizzaBlock key={i} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const { data } = await axios.get(
      `https://64374d090c58d3b1456eb3e3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    );
    setPizzas(data);
    setIsLoading(false);
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
      fetchPizzas();
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

      <div className="content__items">{isLoading ? skeletons : filteredPizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  );
};

Home.propTypes = {
  searchvalue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Home;
