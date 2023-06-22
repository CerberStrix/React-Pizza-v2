import React from 'react';
import PropTypes from 'prop-types';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ value, onChange }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => onChange(index)}
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
  onChange: PropTypes.func,
};
