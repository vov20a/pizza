import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { env } from 'process';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`${env.MONGODB_URI}/${id}`);
        setPizza(data);
        // console.log(data);
      } catch (error) {
        alert("Error now");
        navigate('/'); //return to home
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
};

export default FullPizza;
