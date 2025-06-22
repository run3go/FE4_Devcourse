export default function MovieList({
  engTitle,
  korTitle,
}: {
  engTitle: string;
  korTitle: string;
}) {
  return (
    <section className="movie">
      <h3 className="movie-category">{engTitle}</h3>
      <h4 className="movie-subtext">
        {korTitle} <a href="#">더보기</a>
      </h4>
      <div className="movie-list">
        <div className="movie-list__item">
          <a href="#" className="skeleton-list-item ui0">
            {" "}
          </a>
        </div>
        <div className="movie-list__item">
          <a href="#">
            <figure>
              <img
                src="https://image.tmdb.org/t/p/w300/tlcuhdNMKNGEVpGqBZrAaOOf1A6.jpg"
                alt=""
              />
            </figure>
            <div className="movie-list__txt">
              <div className="progress-circle p50">
                <span>10%</span>
                <div className="left-half-clipper">
                  <div className="first50-bar"></div>
                  <div className="value-bar"></div>
                </div>
              </div>
              <strong className="movie-list__title">Civil War</strong>
              <span className="release_date">2023.11.21</span>
            </div>
          </a>
        </div>
        <div className="movie-list__item">
          <a href="#">
            <figure>
              <img
                src="https://image.tmdb.org/t/p/w500//clJYtRBUhDtvKhPk2HNfXouviKF.jpg"
                alt=""
              />
            </figure>
            <div className="movie-list__txt">
              <div className="progress-circle p50">
                <span>10%</span>
                <div className="left-half-clipper">
                  <div className="first50-bar"></div>
                  <div className="value-bar"></div>
                </div>
              </div>
              <strong className="movie-list__title">Civil War</strong>
              <span className="release_date">2023.11.21</span>
            </div>
          </a>
        </div>
        <div className="movie-list__item">
          <a href="#">
            <figure>
              <img
                src="https://image.tmdb.org/t/p/w500//gqkJSh8pqMdiWwPfRNJGQkuivDi.jpg"
                alt=""
              />
            </figure>
            <div className="movie-list__txt">
              <div className="progress-circle p50">
                <span>10%</span>
                <div className="left-half-clipper">
                  <div className="first50-bar"></div>
                  <div className="value-bar"></div>
                </div>
              </div>
              <strong className="movie-list__title">Civil War</strong>
              <span className="release_date">2023.11.21</span>
            </div>
          </a>
        </div>
        <div className="movie-list__item">
          <a href="#">
            <figure>
              <img
                src="https://image.tmdb.org/t/p/w500//clJYtRBUhDtvKhPk2HNfXouviKF.jpg"
                alt=""
              />
            </figure>
            <div className="movie-list__txt">
              <div className="progress-circle p50">
                <span>10%</span>
                <div className="left-half-clipper">
                  <div className="first50-bar"></div>
                  <div className="value-bar"></div>
                </div>
              </div>
              <strong className="movie-list__title">Civil War</strong>
              <span className="release_date">2023.11.21</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
