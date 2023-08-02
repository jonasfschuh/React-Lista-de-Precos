import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch } from "react-icons/fa";
import { FaRedo } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb'
import axios from "axios";
import "../../Styles/Card_homeCrud.css";

export default function HomeCrud() {
  const [values, setValues] = useState();
  const [listProducts, setlistProducts] = useState();

  function handleChangeValues(name, value) {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  function handleClickSearch() {
    const nome = values.pesquisa
    Axios.get(`http://localhost:3001/getCards/${nome}`)
      .then(({ data }) => {
        setlistProducts(data);
      });
  }

  const handleClickButton = () => {
    console.log(values)
    Axios.post("http://localhost:3001/insert", {
      name: values.name,
      cost: values.cost,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(({ data }) => setlistProducts(data))
  }, [values]);

  const sair = () => {
    localStorage.clear();
    window.location.reload();
  }

  const logado = localStorage.getItem('login');

  return (
    <div className="content">
      <header className="py-3 mb-3 border-bottom">
        <div className="container-fluid d-grid gap-3 align-items-center header-display">
          <div class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown">
            <div className="usuariologado">Usuário:  { logado}</div>
          </div>
          <div className="container-fluid d-grid gap-3 align-items-center ">
            <div className="d-flex align-items-center">
              <form onSubmit={(event) => { event.preventDefault() }} class="w-100 me-2">
                <div className="search">
                  <input
                    type="Search"
                    name="pesquisa"
                    className="form-control pesquisar"
                    placeholder="Pesquisar..."
                    aria-label="Search"
                    onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
                  />
                  <button
                    className="search-input"
                    onClick={() => handleClickSearch()}>
                    <FaSearch />
                  </button>
                  <button
                    className="search-input"
                    onClick={() => window.location.reload()}>
                    <FaRedo />
                  </button>
                  <button
                    onClick={sair}
                    className="exit">
                    <TbLogout/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="inserts">
        <input
          type="text"
          name="name"
          placeholder="Produto"
          className="form-control produto"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="cost"
          placeholder="Preço"
          className="form-control preco"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <button
          className="btn btn-primary botao"
          onClick={() => {
            handleClickButton()
            window.location.reload()
          }}
        >
          Cadastrar produto
        </button>
      </div>

      {typeof listProducts !== "undefined" &&
        listProducts.map((value) => {
          return (
            <Card
              key={value.id}
              listCard={listProducts}
              setListCard={setlistProducts}
              id={value.iditems}
              name={value.name}
              cost={value.cost} />
          );
        })}
    </div>
  );
}


