import React from 'react';
import PropTypes from 'prop-types';
import { SearchContext } from '../App';

import { Categories } from '../components/Categories';
import PizzaBlock from '../components/Pizzablock';
import { Sort } from '../components/Sort';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const { searchvalue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortTypeObj, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const filteredPizzas = pizzas
    .filter((items) => items.title.toLowerCase().includes(searchvalue.toLowerCase()))
    .map((obj, i) => <PizzaBlock key={i} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortTypeObj.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sortTypeObj.sortProperty.replace('-', '');
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
  }, [categoryId, sortTypeObj, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={setCategoryId} />
        <Sort value={sortTypeObj} setValue={setSortType} />
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
