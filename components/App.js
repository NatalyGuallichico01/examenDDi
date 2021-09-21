import "../styles/App.css";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "antd";

function App() {
  const [advice, setAdvice] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [searching, setSearching] = useState([1]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.adviceslip.com/advice`);

      const other = await response.json();
      console.log(response);
      setAdvice(Object.values(other));
      console.log(other);
      console.log(advice);
    };
    getData();
  }, []);

  const handleChangeAdvice = () => {
    const getData = async () => {
      const response = await fetch(`https://api.adviceslip.com/advice`);

      const other = await response.json();
      console.log(response);
      setAdvice(Object.values(other));
      console.log(other);
      console.log(advice);
    };
    getData();
  };
  const handleAddToFavourite = (item) => {
    if (!favourites.includes(item)) {
      setFavourites((prevState) => [...prevState, item]);
    }
  };
  const handleDelete = (item) => {
    const newFavouritesArreglo = favourites.filter((newItem) => {
      return newItem !== item;
    });
    setFavourites(newFavouritesArreglo);
  };
  const handleSearchAdvice = () => {
    const word = document.getElementById("advice").value.toLowerCase();
    const getData = async () => {
      const response = await fetch(
        `https://api.adviceslip.com/advice/search/${word}`
      );
      const data = await response.json();
      console.log("resultados de busqueda: ", data);
      if (data.slips !== undefined) {
        setSearching(Object.values(data)[2]);
      } else {
        setSearching([]);
      }
      console.log(Object.values(data)[2]);
    };
    if (word !== "") {
      getData();
    } else {
      setSearching([]);
    }
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <h1>Consejo del dia</h1>
          {advice.map((item, key) => (
            <div key={key}>
              <p>{item.advice}</p>
              <button onClick={() => handleAddToFavourite(item)}>
                Marcar como favorito
              </button>
              <Button onClick={() => handleChangeAdvice(1)} type="primary">
                Siguiente consejo
              </Button>
            </div>
          ))}
        </Col>
        <Col span={12}>
          <div>
            <h1>Consejos Favoritos</h1>

            {favourites.map((item, key) => (
              <div key={key}>
                <p>{item.advice}</p>
                <div className="favourite_rigth">
                  <button onClick={() => handleDelete(item)}>
                    Quitar de Favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <div>
        <h1>Buscador de consejos</h1>
        <div>
          <label htmlFor="advice">Palabra clave: </label>
          <input type="text" name="advice" id="advice" />
          <button onClick={handleSearchAdvice}>Buscar</button>
        </div>
        <h2>Resultados de la búsqueda</h2>
        <div>
          {searching.length === 0
            ? "No se encontraron coincidencias"
            : searching.map((item, key) => (
                <div key={key}>
                  <p>{item.advice}</p>
                  <button onClick={() => handleAddToFavourite(item)}>
                    Marcar como favorito
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
