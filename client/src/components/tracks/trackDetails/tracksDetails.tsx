import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ITrackDetails } from '../../../interfaces/tracksInterfaces'
import { deleteTrack, getTracksDetailQuery } from '../../../api/tracksApi'
import css from './tracksDetails.module.css'
import { message, Modal, Spin } from 'antd'
import { CloseOutlined, FormOutlined } from '@ant-design/icons'
import { UpdatePlantForm } from '../../FormModals/UpdateTrack'



const TracksDetails = () => {
    const { id} = useParams<{id:string}>()
    const navigate = useNavigate();
    const [trackInfo, setTrackInfo] = useState<ITrackDetails | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const getTrackDetail = async () => {
        if (!id) {
            console.error("ID трека не указан в URL");
            return;
        }
          try {
              const data = await getTracksDetailQuery(id)
              setTrackInfo(data)
          } catch (error) {
              console.error("Ошибка при получении данных о треках:", error);
          }
      }
       useEffect(() => {
            getTrackDetail()
          }, [id]);
          if (!trackInfo) {
            return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}><Spin/></div>;
        }
        const handleDelete = async () => {
            if (!id) return;
            try {
                await deleteTrack(id);
                message.success('Трек успешно удален!');
                setIsModalVisible(false);
                navigate('/tracks'); // Перенаправляем на список треков после удаления
            } catch (error) {
                message.error('Ошибка при удалении трека');
                console.error("Ошибка при удалении трека:", error);
            }
        };

        const showModal = () => {
            setIsModalVisible(true);
        };
        const handleCancel = () => {
            setIsModalVisible(false);
        };
        const onUpdate = () => {
            setVisible(false);
            getTrackDetail()
        };
    
    return (
        <div className={css.cardContainer}>
        <div className={css.card}>
            <h2 className={css.cardTitle}>{trackInfo.title}</h2>
                <button className={`${css.interactionButtons} ${css.closeButton}`}  onClick={showModal}>
                    <CloseOutlined />
                </button>
                <button className={`${css.interactionButtons} ${css.editButton}`} onClick={() => setVisible(true)} >
                    <FormOutlined />
                </button>
                <UpdatePlantForm
                        visible={visible}
                        setVisible={setVisible}
                        track={trackInfo}
                        onUpdate={onUpdate}
                      />
            <div className={css.cardSection}>
                <p className={css.cardText}><b>Длительность:</b> {trackInfo.duration}</p>
            </div>

            <div className={css.cardSection}>
                <p className={css.cardText}><b>Музыкант:</b> {trackInfo.musician.name}</p>
            </div>

            {trackInfo.album && (
                <div className={css.cardSection}>
                    <p className={css.cardText}><b>Альбом:</b> {trackInfo.album.title}</p>
                    <p className={css.cardText}><b>Год выпуска:</b> {trackInfo.album.release_year}</p>
                </div>
            )}

            <div className={css.cardSection}>
                <p className={css.cardText}><b>Жанры:</b></p>
                <ul className={css.cardGenres}>
                    {trackInfo.genres.map((genre) => (
                        <li key={genre.genre_id} className={css.genreItem}>
                            {genre.genre_name}
                        </li>
                    ))}
                </ul>
            </div>
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
                <p>Вы уверены, что хотите удалить этот трек?</p>
            </Modal>
    </div>
    )
}

export default TracksDetails