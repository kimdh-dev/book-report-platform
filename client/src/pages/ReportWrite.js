import { Link, useParams } from "react-router-dom";
import Head from "../component/Heads";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Container } from "react-bootstrap";

function ReportWrite() {
  const { bookId } = useParams();

  return (
    <div>
      <Head isLoggedIn={true} />
      <Container className="book-info-container pt-5">
        <div className="row">
          독서록 작성 페이지
          <br /> 제목: {bookId} 독서록
        </div>
      </Container>
    </div>
  );
}

export default ReportWrite;
