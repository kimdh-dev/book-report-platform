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
      <Head />
      <section className="main-page">
        <Container>
          <h4>베스트셀러 책</h4>
          <BestSeller />
        </Container>
      </section>
    </div>
  );
}

export default Home;
