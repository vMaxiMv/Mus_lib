import { Button, Image, message, Modal, Spin } from "antd"
import css from './playlistsCollection.module.css'
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useDeletePlaylistMutation, useGetPlaylistsDetailQuery} from "../../api/playlistApi"



const PlaylistsDetail = () => {
    const { id } = useParams<{id: string}>()
    const navigate = useNavigate();
    const deletePlaylistMutation = useDeletePlaylistMutation()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {data: playlistInfo, isLoading} = useGetPlaylistsDetailQuery(id || '')
    if (isLoading || !playlistInfo){
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin />
        </div>
      );
    }
    

      const handleDelete = async () => {
        if (!id) return;
        deletePlaylistMutation.mutate(id, {
          onSuccess: () => {
            message.success('Плейлист успшено удален!')
            setIsModalVisible(false);
            navigate('/playlists');
          },
          onError: (error) => {
            message.error('Ошибка при удалении плейлиста')
            console.error('Ошибка при удалении плейлиста', error)
          }
        })
      }

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    return (
        <div className={css.playlistContainer}>
        <div className={css.playlistHeader}>
          <img
            src={playlistInfo.cover_image_url}
            alt={css.name}
            className={css.playlistCover}
          />
          
          <div className={css.playlistInfo}>
            <h2 className={css.playlistTitle}>{css.name}</h2>
            <p className={css.playlistDescription}>{css.description}</p>
            <div className={css.playlistMeta}>
            <p>
              <strong>Создан:</strong>{" "}
              {new Date(playlistInfo.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Обновлен:</strong>{" "}
              {new Date(playlistInfo.updated_at).toLocaleDateString()}
            </p>
             <Button type="primary"  onClick={showModal} danger>Удалить</Button>
            </div>
          </div>
        </div>
        <div className={css.playlistTracks}>
          <h3 className={css.tracksTitle}>Треки</h3>
          <ul className={css.tracksList}>
            {playlistInfo.tracks.map((track:any) => (
              <li key={track.track_id} className={css.trackItem}>
                <span className={css.trackTitle}>{track.title}</span>
                <span className={css.trackDuration}>{track.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        <Modal
                title="Подтверждение удаления"
                open={isModalVisible}
                okButtonProps={{
                    style: { backgroundColor: "black", color: "#fff", borderRadius: "8px" },
                  }}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Удалить"
                cancelText="Отмена"
            >
                <p>Вы уверены, что хотите удалить этот плейлист?</p>
            </Modal>
      </div>
    )
}

export default PlaylistsDetail