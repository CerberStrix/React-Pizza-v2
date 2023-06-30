import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: string
  }>();

  React.useEffect(() => {
    const fetchPizza = async (): Promise<void> => {
      try {
        const { data } = await axios.get(`https://64374d090c58d3b1456eb3e3.mockapi.io/items/${String(id)}`);
        setPizza(data);
      } catch (error) {
        navigate('/');
      }
    };

    void fetchPizza();
  }, []);

  if (pizza == null) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h1>{pizza.title}</h1>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
