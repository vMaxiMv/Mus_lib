import { Button, Card, Col, Image, Row } from "antd"
import { IPlayList } from "../../interfaces/playlistInterface"
import css from './playlistsCollection.module.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import { CreatePlaylistForm } from "../FormModals/CreatePlaylist"

interface playlistsProps {
    playlists: IPlayList[]
   // onRefreshPlaylists: () => void;
}


const PlaylistsCollection = ({playlists}: playlistsProps) => {
  const [visible, setVisible] = useState(false);

    
    return (
        <div className={css.grid}>
           <h2 className={css.playlistTitle}>Список плейлистов</h2>
      <div  className={css.addButton}>
      <Button color="default" variant="solid"  onClick={() => setVisible(true)}>
                Добавить плейлист
      </Button>
      <CreatePlaylistForm
        visible={visible}
        setVisible={setVisible}
      />
      </div>
        <Row gutter={[16, 16]}>
          {playlists.map((playlist, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Link to={`/playlists/${playlist.playlist_id}`}>
              <Card
                className={css.card}
                hoverable
                cover={<div className={css.cover} style={{ backgroundImage: `url(${playlist.cover_image_url})` }} />}
              >
                <Card.Meta title={playlist.name} description={playlist.description} />
              </Card>
              </Link>
            </Col>
          ))}
        </Row>
       
        </div>
    )
}

export default PlaylistsCollection