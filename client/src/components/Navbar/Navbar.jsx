import React, { useEffect, useState } from "react";
import { FaHome, FaPlus, FaSistrix, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal"; 
//
import ReactSearchBox from "react-search-box";
import axios from "axios";
 
function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("Login");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nombre = sessionStorage.getItem("nombre");
  const [ dataSearch, setDataSearch]= useState([]);


  useEffect(() => {
    var transformedData=[];
    axios.get(`http://localhost:8080/usuarios/nombre_usuario`).then((response) => {
      const data = response.data
      transformedData = data.map( obj => {
        return {
          key: obj.nombre_usuario,
          value: obj.nombre_usuario
        };
      });
      setDataSearch(transformedData);
  });
},[])




  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleShowSearchModal = () => setShowSearchModal(true);
  const handleCloseSearchModal = () => setShowSearchModal(false);


  const loggedIn = sessionStorage.getItem("isLoggedIn");


  // This function receives the value of isLoggedIn from the LoginModal
  const handleLogin = (value) => {
    setIsLoggedIn(value);
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload()
  };


  return (
    <header className="header container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light" style={{padding:"20px"}}>
       
        <strong><a className="navbar-brand text-white" href="/">
        <a style={{color:"rgb(255, 15, 155)"}}>P</a>lan <a style={{color:"rgb(255, 15, 155)"}}>T</a>oday </a></strong>
     
       
        <div className="justify-content-center mx-0 d-flex">
          <div
            className="collapse navbar-collapse position-relative"
            id="navbarNavDropdown"
          >
            <Form className="iconos d-flex">
              <ReactSearchBox
            placeholder=" Buscar usuario"
            aria-label="Search"
            className="me-2"
            variant="warning"
            data={dataSearch}
            callback={(record) => console.log(record)}
      />
              <Button
                className="busca"
                variant="warning"
              >
                <FaSistrix />
              </Button>
            </Form>  
            
            {loggedIn ? (
              <div className="upload d-flex align-items-center">
              <Button variant="light" className="uploadBoton">
                <FaPlus />
              </Button>
            </div>
            ) : (
              <div className="upload d-flex align-items-center">
              <Button variant="light" className="uploadBoton" onClick={handleShowModal}>
                <FaPlus />
              </Button>
            </div>
            )}
           
            {loggedIn ? (
              <b><div className="botones">
                Bienvenido {nombre} 👋
              </div></b>
            ) : (
              <div className="botones">
                <Button variant="dark" onClick={() =>
                {
                    handleShowModal(); setTipoModal("Login");  
                }}>
                  Iniciar sesión
                </Button>
                <Button variant="dark" onClick={() =>
                {
                    handleShowModal(); setTipoModal("Register");  
                }}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>


        <Modal show={showModal} onHide={handleCloseModal}>
          {
          tipoModal == "Login" ? <LoginModal
            setTipoModal={setTipoModal}
            handleCloseModal={handleCloseModal}
          /> :
          <RegisterModal
            setTipoModal={setTipoModal}
            handleCloseModal={handleCloseModal}
          /> }
        </Modal>
      </nav>
    </header>
  );
}


export default Navbar;
