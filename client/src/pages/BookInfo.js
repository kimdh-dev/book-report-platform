import { useParams } from "react-router-dom";
import Head from "../component/Heads";

function BookInfo() {
  const { id } = useParams();
  return (
    <div>
      <Head isLoggedIn={true} />
      <div>id: {id}</div>
    </div>
  );
}

export default BookInfo;
