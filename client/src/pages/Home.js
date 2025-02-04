import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Head from "../component/Heads";
import Book from "../component/Book";

function Home() {
  const movieElem = () => {
    const result = [];
    for (let i = 0; i < 8; i++) {
      result.push(
        <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
          <Book />
        </Col>
      );
    }
    return result;
  };

  return (
    <div>
      <Head isLoggedIn={true} />
      <div style={{ marginTop: "40px" }}></div>
      <Container>
        <Row>{movieElem()}</Row>
      </Container>

      {/* <h1>독서록 플랫폼에 오신 것을 환영합니다.</h1>
      <p>책을 검색하고, 독서록을 작성해보세요.</p>
      <div>
        <form method="get" action="/search">
          <input
            type="text"
            name="keyword"
            placeholder="검색하고 싶은 책 제목을 입력해주세요."
          />
          <button type="submit">검색</button>
        </form>
      </div> */}
    </div>
  );
}

export default Home;
