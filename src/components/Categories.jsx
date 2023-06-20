import React from 'react';
import PropTypes from 'prop-types';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ value, setValue }) => {
  const changeActiveCat = (index) => {
    setValue(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => changeActiveCat(index)}
              className={index === value ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
};
