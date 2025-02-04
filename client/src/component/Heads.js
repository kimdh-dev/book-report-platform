import React, { useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  InputGroup,
  Form,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import { Link } from "react-router-dom";

function Head({ isLoggedIn }) {
  const searchClicked = () => {
    console.log("button clicked");
    return;
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Book Report</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <InputGroup className="search-group">
                <Form.Control type="text" placeholder="검색" />
                <Button
                  className="searchBtnWrap"
                  onclick={searchClicked}
                  style={{
                    cursor: "pointer",
                    width: "50px",
                    border: "1px solid #000000",
                    borderRadius: "5px",
                  }}
                  variant="light"
                >
                  <img src="/img/icon/search.png" style={{ width: "100%" }} />
                </Button>
              </InputGroup>
            </Nav>
            <Nav>
              <Nav.Item>
                <Nav.Link className="cursor">
                  <div className="user">
                    <img
                      src="/img/icon/user.png"
                      alt="프로필"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Head;
