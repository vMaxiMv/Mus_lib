import { useNavigate } from "react-router-dom";

const TracksList = ({tracks}:any)  => {
    const navigate = useNavigate();
  
    const handleTrackClick = (id: number) => {
      navigate(`/tracks/${id}`);
    };
  
    return (
      <div className="tracks-container">
        <h2>Список треков</h2>
        <ul className="tracks-list">
          {tracks.map((track:any) => (
            <li
              key={track.id}
              className="track-item"
              onClick={() => handleTrackClick(track.track_id)}
            >
              <span className="track-title">{track.title}</span>
              <span className="track-duration">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TracksList;