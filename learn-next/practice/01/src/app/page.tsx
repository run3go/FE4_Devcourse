import MovieList from "./components/MovieList";

export default function page() {
  return (
    <>
      <section className="release">
        <div
          className="release-item"
          style={{
            backgroundImage:
              "url(https://image.tmdb.org/t/p/w500//t5zCBSB5xMDKcDqe91qahCOUYVV.jpg)",
          }}
        >
          <div className="release__text">
            <strong className="release__category">NEW RELEASE</strong>
            <h2 className="release__title">Soviet : The Cold War</h2>
            <p className="release__desc">
              Her senses grow sharper, her thinking clearer, and for the first
              time in her life she feels herself fully in control. By the age of
              sixteen, she&#39s competing for the U.S.
            </p>
            <button className="release__btn">자세히보기</button>
          </div>
        </div>
      </section>
      <MovieList engTitle="Now Movies" korTitle="상영중인 영화" />
      <MovieList engTitle="Now Popular" korTitle="인기있는 영화" />
      <MovieList engTitle="Up Comming" korTitle="개봉예정 영화" />
      <MovieList engTitle="Top Rated" korTitle="높은 평점을 받은 영화" />
      <footer className="footer">
        <p>copyright @ sucoding vuejs course</p>
      </footer>
    </>
  );
}
