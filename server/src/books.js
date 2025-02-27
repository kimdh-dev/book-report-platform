import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const REQ_HEADER = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
};

// 국립중앙도서관 API KEY - 미사용
const API_KEY = process.env.API_KEY;

const ALADIN_API_BASE_URL = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";
const ALADIN_API_SEARCH_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";
const ALADIN_API_INFO_URL = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";

const ALADIN_API_KEY = process.env.ALADIN_API_KEY;

const fetchData = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error("에러 발생");
  }
};

// 알라딘 베스트셀러 조회
router.get("/bestseller", async (req, res) => {
  const size = req.query.size || 50;
  const page = req.query.page || 1;
  const Q_TYPE = "Bestseller";
  const REQ_URL = `${ALADIN_API_BASE_URL}?ttbkey=${ALADIN_API_KEY}&QueryType=${Q_TYPE}&MaxResults=${size}&start=${page}&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;
  try {
    const data = await fetchData(REQ_URL, REQ_HEADER);
    res.json(data);
  } catch (error) {
    req.status(500).json({ error: error.message });
  }
});

// 알라딘 책 검색
router.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  const size = req.query.size || 50;
  const page = req.query.page || 1;
  const Q_TYPE = "Keyword";
  const REQ_URL = `${ALADIN_API_SEARCH_URL}?ttbkey=${ALADIN_API_KEY}&Query=${keyword}&QueryType=${Q_TYPE}&MaxResults=${size}&start=${page}&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;
  try {
    const data = await fetchData(REQ_URL, REQ_HEADER);
    res.json(data);
  } catch (error) {
    req.status(500).json({ error: error.message });
  }
});

// 알라딘 책 정보
router.get("/info", async (req, res) => {
  const { isbn } = req.query;

  const REQ_URL = `${ALADIN_API_INFO_URL}?ttbkey=${ALADIN_API_KEY}&itemIdType=ISBN13&ItemId=${isbn}&Cover=big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList`;
  try {
    const data = await fetchData(REQ_URL, REQ_HEADER);
    res.json(data);
  } catch (error) {
    req.status(500).json({ error: error.message });
  }
});

// 책 검색 API (소장자료 검색) - TEST: http://localhost:5000/api/search_nl?keyword=시한부
// router.get("/search_nl", (req, res) => {
//   try {
//     const keyword = req.query.keyword;
//     if (!keyword) {
//       res.send("책 검색 오류");
//       return;
//     }
//     console.log("검색할 책 (search): " + keyword);
//     const data = {
//       key: API_KEY,
//       srchTarget: "total",
//       kwd: keyword,
//       pageNum: 1,
//       pageSize: 10,
//       systemType: "오프라인자료",
//       category: "도서",
//       order: "asc",
//       apiType: "json",
//     };
//     const options = {
//       params: data,
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//       },
//     };
//     axios
//       .get("https://www.nl.go.kr/NL/search/openApi/search.do", options)
//       .then((response) => {
//         res.send(response.data);
//       });

//     return;
//   } catch (e) {
//     console.log(e);
//     res.send("책 검색 오류");
//     return;
//   }
// });

// // 서지정보 API - TEST: http://localhost:5000/api/seoji_nl?isbn=9791193647646
// router.get("/seoji_nl", (req, res) => {
//   try {
//     const isbn = req.query.isbn;
//     if (!isbn) {
//       res.send("서지 검색 오류");
//       return;
//     }
//     console.log("서지 검색 (isbn): " + isbn);
//     const data = {
//       cert_key: API_KEY,
//       result_style: "json",
//       page_no: 1,
//       page_size: 10,
//       isbn: isbn,
//     };
//     const options = {
//       params: data,
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//       },
//     };
//     axios
//       .get("https://www.nl.go.kr/seoji/SearchApi.do", options)
//       .then((response) => {
//         res.send(response.data);
//       });

//     return;
//   } catch (e) {
//     console.log(e);
//     res.send("책 검색 오류");
//     return;
//   }
// });

export default router;
