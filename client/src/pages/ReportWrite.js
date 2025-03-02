import { Link, useNavigate, useParams } from "react-router-dom";
import Head from "../component/Heads";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Container } from "react-bootstrap";
import styles from "./ReportWrite.module.css";
import { use, useEffect, useState } from "react";
import React from "react";
import { Button, ConfigProvider, Flex } from "antd";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import db from "../api/firebseApi";

function ReportWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { bookId } = useParams();
  const { data, error } = useSWR(`/api/books/info?isbn=${bookId}`, fetcher);

  const loadInfo = (data, error) => {
    if (error) {
      return;
    }

    if (!data) {
      return;
    }

    if (data.errorCode) {
      return;
    }
    const bookName = data.item[0].title.split(" -")[0];
    setTitle(bookName + " 독서록");
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const uploadReport = async () => {
    const convertedContent = content.replaceAll("\n", "<br>");
    console.log("제목", title);
    console.log("내용", convertedContent);

    const userRef = await addDoc(collection(db, "userReport"), {
      title: title,
      content: convertedContent,
      uploader: "name",
      bookId: bookId,
      date: Date.now(), // 현재 날짜,시간
    });

    navigate("/bookInfo/" + bookId);
  };

  useEffect(() => {
    loadInfo(data, error);
  }, [data]);

  return (
    <div>
      <Head isLoggedIn={true} />
      <Container className={`${styles.container} pt-5`}>
        <div>
          <h2>독서록 작성</h2>
        </div>
        <div style={{ marginTop: 30 }}>
          <h4>제목</h4>
          <input
            type="text"
            placeholder="제목을 작성하세요."
            value={title}
            onChange={onTitleChange}
            name="title"
            className={styles.title}
          />
          <h4 style={{ marginTop: 30 }}>내용</h4>
          <textarea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={onContentChange}
            name="content"
            className={styles.content}
          />
          <div className={styles.btns}>
            <Button type="primary" variant="solid" onClick={uploadReport}>
              등록
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ReportWrite;
