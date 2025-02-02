import { IGenre } from "../../interfaces/tracksInterfaces";
import css from './genreList.module.css'

interface GenresListProps {
  genres: IGenre[];
}

const GenresList = ({ genres }: GenresListProps) => {
    const colors = ["#3be477", "#ff6b6b", "#6b6bff", "#ffd166", "#66ffd1", "#ff95ca", "#a685e2", "#ffcc00"];
  return (
    <div className={css.genreContainer}>
      <h2 className={css.genreTitle}>Список жанров</h2>
      <div className={css.genresGrid}>
        {genres.map((genre, index) => (
          <div key={genre.genre_id} 
               className={css.genreCircle}
               style={{ backgroundColor: colors[index % colors.length] }}
               > 
            <span className={css.genreName}>{genre.genre_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
