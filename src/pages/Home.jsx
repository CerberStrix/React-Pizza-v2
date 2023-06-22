import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategoryId, changeSortType } from '../redux/slices/filterSlice.js';
import PropTypes from 'prop-types';
import { SearchContext } from '../App';

import { Categories } from '../components/Categories';
import PizzaBlock from '../components/Pizzablock';
import { Sort } from '../components/Sort';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filters);
  const { searchvalue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredPizzas = pizzas
    .filter((items) => items.title.toLowerCase().includes(searchvalue.toLowerCase()))
    .map((obj, i) => <PizzaBlock key={i} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategory = (id) => {
    dispatch(changeCategoryId(id));
  };

  const onChangeSort = (obj) => {
    dispatch(changeSortType(obj));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `https://64374d090c58d3b1456eb3e3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={onChangeCategory} />
        <Sort value={sort} onChange={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? skeletons : filteredPizzas}</div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
};

Home.propTypes = {
  searchvalue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Home;
