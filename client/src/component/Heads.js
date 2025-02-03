import { Link } from "react-router-dom";

function Head({ isLoggedIn }) {
  return (
    <header className="bg-blue-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">독서록 플랫폼</h1>
          <ul className="flex space-x-6 text-white">
            <li>
              <Link to="/" className="hover:text-gray-200">
                책 검색
              </Link>
            </li>
            <li>
              <Link to="/popular-logs" className="hover:text-gray-200">
                인기 독서록
              </Link>
            </li>
            <li>
              <Link to="/reading-logs" className="hover:text-gray-200">
                나의 독서록
              </Link>
            </li>
          </ul>

          {/* 로그인/내 정보 버튼 */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white hover:text-gray-200">
                  내 정보
                </Link>
                <button className="text-white hover:text-gray-200">
                  로그아웃
                </button>
              </>
            ) : (
              <button className="text-white hover:text-gray-200">로그인</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Head;
