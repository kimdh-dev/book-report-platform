import styles from "./Book.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Book({ id, title, author, date, img }) {
  return (
    // <div className="book-card p-2">
    //   <Link to={`/bookInfo/${id}`}>
    //     <div className="book-image">
    //       <img src={img} className="img" />
    //     </div>
    //   </Link>
    //   <div className="book-name ms-2 me-2">{title.split("-")[0]}</div>
    //   <div className="book-author m-2">{author}</div>
    // </div>
    <div className={`${styles.bookCard} p-2`}>
      <Link to={`/bookInfo/${id}`}>
        <div className={styles.bookImgWrap}>
          <img src={img} className={styles.bookImg} />
        </div>
      </Link>
      <div className={`${styles.bookName} ms-2 me-2`}>
        {title.split("-")[0]}
      </div>
      <div className={`${styles.bookAuthor} m-2`}>{author}</div>
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Book;
