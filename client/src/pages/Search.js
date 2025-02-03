import { useParams } from "react-router-dom";

function Search() {
  const { keyword } = useParams();
  return <div>검색할 책 제목: {keyword}</div>;
}

export default Search;
