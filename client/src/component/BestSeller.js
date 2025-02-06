import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Book from "./Book";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

function BestSeller() {
  //   const [loading, setLoading] = useState(true);
  //   const [books, setBooks] = useState([]);

  const { data, error } = useSWR("/api/books/bestseller?page=1", fetcher);
  if (error) {
    return "error";
  }

  if (!data) {
    return "loading";
  }

  console.log(data);

  // 미사용
  //   const movieElem = () => {
  //     const result = [];
  //     for (let i = 0; i < 8; i++) {
  //       result.push(
  //         <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
  //           <Book />
  //         </Col>
  //       );
  //     }
  //     return result;
  //   };

  return (
    <div>
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
    </div>
  );

  // <div>
  //   <Row></Row>
  //   <Row>{movieElem()}</Row>{" "}
  //   <div className="pb-4">
  //     <Pagination align="center" defaultCurrent={1} total={100} />
  //   </div>
  // </div>
}

export default BestSeller;
