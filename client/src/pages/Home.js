import { useState } from "react";
import Head from "../component/Heads";

function Home() {
  return (
    <div>
      <Head isLoggedIn={true} />
      <h1>독서록 플랫폼에 오신 것을 환영합니다.</h1>
      <p>책을 검색하고, 독서록을 작성해보세요.</p>
      <div>
        <form method="get" action="/search">
          <input
            type="text"
            name="keyword"
            placeholder="검색하고 싶은 책 제목을 입력해주세요."
          />
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
