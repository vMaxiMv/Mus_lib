import { useState } from "react";
import { Link } from "react-router-dom";
import css from './TracksList.module.css'
import { Button } from "antd";
import { CreateTrackForm } from "../FormModals/CreateTrack";
import { ITrackPlaylist } from "../../interfaces/tracksInterfaces";


interface TracksListProps {
  tracks: ITrackPlaylist[];
}

const TracksList = ({ tracks }:TracksListProps) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div style={{width:'90%', margin: '0 auto'}}>
      <div className={css.trackContainer}>
        <h2 className={css.trackTitle}>Список треков</h2>
        <div  className={css.addButton}>
        <Button color="default" variant="solid"  onClick={() => setVisible(true)}>
                  Добавить трек
        </Button>
        <CreateTrackForm
          visible={visible}
          setVisible={setVisible}
          
        />
        </div>

        <div className={css.tracksList}>
          {tracks.map((track) => (
            <Link
              to={`/tracks/${track.track_id}`}
              key={track.track_id}
              className={css.trackItem}
            >
              <span className={css.trackListName}>{track.title}</span>
              <span className={css.trackDuration}>{track.duration}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TracksList;
