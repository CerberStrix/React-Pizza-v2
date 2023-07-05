import React from 'react';
import PropTypes from 'prop-types';

import { useWhyDidYouUpdate } from 'ahooks';

interface CategoriesProps {
  value: number
  onChange: (i: number) => void
}

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChange }) => {
  useWhyDidYouUpdate('Categories', { value, onChange });

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => { onChange(index); }}
              className={index === value ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any
};

Categories.displayName = 'Categories';
