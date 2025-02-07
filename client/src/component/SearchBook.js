import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Book from "./Book";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";

const padding20 = {
  paddingBottom: "20px",
};
function SearchBook({ keyword }) {
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(
    `/api/books/search?keyword=${keyword}&size=${pageSize}&page=${page}`,
    fetcher
  );
  if (error) {
    return "error";
  }

  if (!data) {
    return "loading";
  }

  console.log(data);

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <h4>
        {keyword} 검색결과, 총 {data.totalResults}건
      </h4>
      <Row>
        {data.item.map((book) => (
          <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
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

SearchBook.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default SearchBook;
