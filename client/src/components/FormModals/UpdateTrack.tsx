import { Form, message, Modal } from "antd"

import TrackForm from "./TrackForm";
import { createTrack, updateTrack } from "../../api/tracksApi";
import { ITrackDetails } from "../../interfaces/tracksInterfaces";
import { useEffect } from "react";

interface CreateTrackFormProps {
    visible: boolean; 
    setVisible: (visible: boolean) => void; 
    track: ITrackDetails;
    onUpdate: () => void; 
  }

export const UpdateTrackForm: React.FC<CreateTrackFormProps> = ({ visible, setVisible, track, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(()=>{
        if(track){
            form.setFieldsValue({
                title: track.title,
                duration: track.duration,
                musician_id: track.musician.musician_id,
                genres: track.genres.map((genre) => genre.genre_id)
            })
        }
    },  [track, form])

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            await updateTrack(track.track_id, values); 
            form.resetFields();
            onUpdate(); 
            setVisible(false);
            message.success('Трек успешно обновлен!');
        } catch (error) {
            console.error("Ошибка при обновлении трека:", error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Обносить трек"
            okText="Обновить"
            okButtonProps={{
                style: { backgroundColor: "black", color: "#fff", borderRadius: "8px" },
              }}
            onCancel={() => setVisible(false)}
            cancelText="Отмена" 
            onOk={handleUpdate}
        >
            <TrackForm form={form} />
        </Modal>
    );
};