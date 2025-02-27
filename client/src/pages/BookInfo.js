import { Link, useParams } from "react-router-dom";
import Head from "../component/Heads";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Container } from "react-bootstrap";
// import "../styles/BookInfo.css";
import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./BookInfo.module.css";

function BookInfo() {
  const [isHeart, setIsHeart] = useState(false);

  const { bookId } = useParams();
  const { data, error } = useSWR(`/api/books/info?isbn=${bookId}`, fetcher);
  if (error) {
    return "error";
  }

  if (!data) {
    return "loading";
  }

  if (data.errorCode) {
    return "책 정보가 없습니다.";
  }

  const book = data.item[0];

  const newReport = () => {
    console.log("new report clicked");
  };

  const onClickedHeart = () => {
    console.log("heart clicked");
    setIsHeart(!isHeart);
  };

  return (
    <div>
      <Head isLoggedIn={true} />
      <Container className="book-info-container pt-5">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className={styles.bookInfoLeft}>
                <img src={book.cover} className={styles.bookImg} />
              </div>
              <div
                className={`${styles.bookInfoRight} pt-3 ps-4`}
                style={{ display: "inline-block" }}
              >
                <h2 className="book-info-1">{book.title}</h2>
                <hr />
                <div className="book-info-2 pt-2">
                  {book.author} | {book.publisher} |{" "}
                  {book.pubDate.split("-")[0]}
                </div>
                <div className="pt-2">
                  <span className="pe-1">분류:</span>
                  <span>{book.categoryName}</span>
                </div>
                <div className="pt-4">
                  <Button
                    className="me-4"
                    color="green"
                    variant="solid"
                    size="large"
                  >
                    <Link to={`/report/write/${bookId}`}>독후감 작성</Link>
                  </Button>
                  <span style={{ position: "relative" }}>
                    좋아요
                    {isHeart ? (
                      <HeartFilled
                        className="ps-2"
                        style={{
                          fontSize: 25,
                          color: "red",
                          cursor: "pointer",
                          position: "absolute",
                          top: 0,
                        }}
                        onClick={onClickedHeart}
                      />
                    ) : (
                      <HeartOutlined
                        className="ps-2"
                        style={{
                          fontSize: 25,
                          color: "red",
                          cursor: "pointer",
                          position: "absolute",
                          top: 0,
                        }}
                        onClick={onClickedHeart}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-5" />

        <div className="book-info-desc2 mt-4">
          <h4>책 소개</h4>
          <div>
            <h4 className="mt-3">{book.description}</h4>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BookInfo;
