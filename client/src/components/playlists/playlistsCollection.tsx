import { Button, Card, Col, Image, Row } from "antd"
import { IPlayList } from "../../interfaces/playlistInterface"
import css from './playlistsCollection.module.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CreatePlaylistForm } from "../FormModals/CreatePlaylist"

interface playlistsProps {
    playlists: IPlayList[]
    onRefreshPlaylists: () => void;
}


const PlaylistsCollection: React.FC<playlistsProps> = ({playlists, onRefreshPlaylists}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const handleTrackClick = (id: string) => {
    navigate(`/playlists/${id}`);
  };
  const onCreate = () => {
    setVisible(false);
    onRefreshPlaylists()
};
    
    return (
        <div className={css.grid}>
      <div  className={css.addButton}>
      <Button color="default" variant="solid"  onClick={() => setVisible(true)}>
                Добавить плейлист
      </Button>
      <CreatePlaylistForm
        visible={visible}
        setVisible={setVisible}
        onCreateUpdate={onCreate}
      />
      </div>
        <Row gutter={[16, 16]}>
          {playlists.map((playlist, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Card
                onClick={()=> handleTrackClick(playlist.playlist_id)}
                className={css.card}
                hoverable
                cover={<div className={css.cover} style={{ backgroundImage: `url(${playlist.cover_image_url})` }} />}
              >
                <Card.Meta title={playlist.name} description={playlist.description} />
              </Card>
            </Col>
          ))}
        </Row>
       
        </div>
    )
}

export default PlaylistsCollection