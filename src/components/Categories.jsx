import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const changeActiveCat = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => changeActiveCat(index)}
              className={index === activeIndex ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
