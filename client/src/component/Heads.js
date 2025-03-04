import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import styles from "./Heads.module.css";
import { auth } from "../api/firebseAuth";
import { useRecoilState } from "recoil";
import { isLogin } from "../recoil/auth";

function Head() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);
  const [keyword, setKeyword] = useState("");
  const keywordOnChange = (e) => {
    setKeyword(e.target.value);
  };
  const searchClicked = () => {
    navigate(`/search/${keyword}`);
  };
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      searchClicked();
    }
  };

  const mypageClicked = () => {
    if (username) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ fontWeight: 600 }}>
              Book Report
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <InputGroup className="search-group">
                <Form.Control
                  type="text"
                  placeholder="검색"
                  value={keyword}
                  onChange={keywordOnChange}
                  onKeyDown={(e) => activeEnter(e)}
                />

                <Button
                  className="search-btn"
                  onClick={searchClicked}
                  variant="light"
                >
                  <img src="/img/icon/search.png" style={{ width: "100%" }} />
                </Button>
              </InputGroup>
            </Nav>
            <Nav>
              <Nav.Item>
                <Nav.Link className="cursor">
                  <div className={styles.user}>
                    <img
                      src="/img/icon/user.png"
                      alt="프로필"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "5px",
                      }}
                      onClick={mypageClicked}
                    />
                    {username ? username + "님" : "로그인"}
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
