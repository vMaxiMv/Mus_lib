import React from "react";
import css from "./MusiciansList.module.css";
import { IMusician } from "../../interfaces/musicianInterfaces";


interface MusiciansListProps {
  musicians: IMusician[];
}

const MusiciansList: React.FC<MusiciansListProps> = ({ musicians }) => {
  return (
    <div className={css.musiciansContainer}>
      <h2 className={css.musiciansTitle}>Список музыкантов</h2>
      <div className={css.musiciansGrid}>
        {musicians.map((musician) => (
          <div key={musician.musician_id} className={css.musicianCard}>
            <h3 className={css.musicianName}>{musician.name}</h3>
            <p className={css.musicianInfo}>
              <strong>Дата рождения:</strong>{" "}
              {new Date(musician.birth_date).toLocaleDateString()}
            </p>
            <p className={css.musicianInfo}>
              <strong>Страна:</strong> {musician.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusiciansList;
