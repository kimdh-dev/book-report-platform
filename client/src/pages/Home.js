import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Head from "../component/Heads";
import Book from "../component/Book";
import { Pagination } from "antd";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import BestSeller from "../component/BestSeller";

function Home() {
  return (
    <div>
      <Head isLoggedIn={true} />
      <section className="main-page">
        <Container>
          <h3>인기 책</h3>
          <BestSeller />
        </Container>
      </section>

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
