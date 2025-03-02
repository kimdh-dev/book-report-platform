import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Book from "./Book";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

const padding20 = {
  paddingBottom: "20px",
};
function BestSeller() {
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(
    `/api/books/bestseller?size=${pageSize}&page=${page}`,
    fetcher
  );
  if (error) {
    return "error";
  }

  if (!data) {
    return "loading";
  }

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <Row>
        {data.item.map((book) => (
          <Col
            key={`${book.isbn13}-col`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ marginBottom: "20px" }}
          >
            <Book
              key={book.isbn13}
              id={book.isbn13}
              title={book.title}
              author={book.author}
              date={book.pubDate}
              img={book.cover}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        align="center"
        current={page}
        pageSize={pageSize}
        total={data.totalResults}
        defaultCurrent={1}
        defaultPageSize={50}
        onChange={onPageChange}
      />
      <div style={padding20}></div>
    </div>
  );
}

export default BestSeller;
