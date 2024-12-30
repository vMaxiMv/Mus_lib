import { Form, message, Modal } from "antd"

import TrackForm from "./TrackForm";
import { ITrackDetails } from "../../interfaces/tracksInterfaces";
import { useEffect } from "react";
import { IForm } from "../../interfaces/formInterface";
import { useUpdateTrackMutation } from "../../api/tracksApi";

interface CreateTrackFormProps extends IForm {
    track: ITrackDetails; 
  }

export const UpdateTrackForm: React.FC<CreateTrackFormProps> = ({ 
    visible, 
    setVisible, 
    track, 
    onCreateUpdate 
}) => {
    const [form] = Form.useForm();
    const updateTrackMutation = useUpdateTrackMutation();

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
            updateTrackMutation.mutate({id: track.track_id, trackData: values},
                {
                    onSuccess: () => {
                        form.resetFields();
                        onCreateUpdate(); 
                        setVisible(false);
                        message.success('Трек успешно обновлен!');
                    },
                    onError: (error) => {
                        message.error("Ошибка при обновлении трека");
                        console.error("Ошибка при обновлении трека:", error);
                      },
                }
            )
            
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