import Image from "next/image";
import Link from "next/link";
import homeIcon from "../assets/icons/home.png";
import liveIcon from "../assets/icons/live.png";
import popularIcon from "../assets/icons/popluar.png";
import searchIcon from "../assets/icons/search.png";
import videoIcon from "../assets/icons/video.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link href={"/"}>
          <h1 className="header__logo">Wave</h1>
        </Link>
        <ul className="header__navi">
          <li>
            <Link href={"/movies/now_playing"}>상영중</Link>
          </li>
          <li>
            <Link href={"/movies/popular"}>인기작</Link>
          </li>
          <li>
            <Link href={"/movies/upcoming"}>개봉예정</Link>
          </li>
        </ul>
        <div className="header-search">
          <input
            type="text"
            className="header-search__input"
            placeholder="제목으로 찾아보세요."
          />
          <span className="material-symbols-outlined icon"> search </span>
        </div>
      </header>
      <nav className="navigator">
        <ul className="navigator-list">
          <li className="navigator-list__item">
            <Image src={homeIcon} alt="" className="navigator-list__icon" />
            <strong className="navigator-list__txt">메인</strong>
          </li>
          <li className="navigator-list__item">
            <Image src={liveIcon} alt="" className="navigator-list__icon" />
            <strong className="navigator-list__txt">상영중</strong>
          </li>
          <li className="navigator-list__item">
            <Image src={popularIcon} alt="" className="navigator-list__icon" />
            <strong className="navigator-list__txt">인기작</strong>
          </li>

          <li className="navigator-list__item">
            <Image src={videoIcon} alt="" className="navigator-list__icon" />
            <strong className="navigator-list__txt">개봉예정</strong>
          </li>
          <li className="navigator-list__item">
            <Image src={searchIcon} alt="" className="navigator-list__icon" />
            <strong className="navigator-list__txt">검색</strong>
          </li>
        </ul>
      </nav>
      <section className="search-box">
        <div className="search-input">
          <div className="search-wrap">
            <button>x</button>
            <input
              type="text"
              placeholder="영화 제목을 입력하세요"
              autoComplete="off"
            />
            <span className="material-symbols-outlined icon"> search </span>
          </div>
        </div>
      </section>
    </>
  );
}
