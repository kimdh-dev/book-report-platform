import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Head from "../component/Heads";
import Book from "../component/Book";
import { Pagination } from "antd";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import BestSeller from "../component/BestSeller";
import { useParams } from "react-router-dom";
import SearchBook from "../component/SearchBook";

function Search() {
  const { keyword } = useParams();
  return (
    <div>
      <Head isLoggedIn={true} />
      <section className="main-page">
        <Container>
          <SearchBook keyword={keyword} />
          {/* <BestSeller /> */}
        </Container>
      </section>
    </div>
  );
}

export default Search;
