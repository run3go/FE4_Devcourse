import { getMovieList } from "@/app/apis/axios";

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default async function MovieListPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const movies = await getMovieList(id);

  const movieList: MovieType[] = movies?.data.results;

  const movieSubtext =
    id === "now_playing"
      ? "현재 상영중인 영화"
      : id === "popular"
      ? "인기있는 영화"
      : "개봉예정 영화";

  return (
    <section className="movie list">
      <h4 className="movie-subtext">{movieSubtext}</h4>
      <div className="movie-list">
        <div className="movie-list__item">
          <a href="#" className="skeleton-list-item ui0"></a>
        </div>
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-list__item">
            <a href="#">
              <figure>
                <img
                  src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
                  alt="포스터"
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
                <strong className="movie-list__title">{movie.title}</strong>
                <p className="movie-list__desc">{movie.overview}</p>
                <span className="movie-list__release">
                  {movie.release_date} / 평점 7.3
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
