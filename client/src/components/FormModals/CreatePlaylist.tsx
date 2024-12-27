import { Form, message, Modal } from "antd"
import TrackForm from "./TrackForm";
import { IForm } from "../../interfaces/formInterface";
import { createPlaylist } from "../../api/playlistApi";
import { IPlayListDetail } from "../../interfaces/playlistInterface";
import { PlaylistForm } from "./PlaylistForm";


export const CreatePlaylistForm: React.FC<IForm> = ({ visible, setVisible, onCreateUpdate }) => {
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);

            const file = values.cover_image_url?.fileList?.[0]?.originFileObj;
            if (file) {
                formData.append("cover_image_url", file); // Добавляем файл в FormData
            } else {
                throw new Error("Файл обложки не найден!");
            }
            await createPlaylist(formData); 
            form.resetFields();
            onCreateUpdate(); 
            setVisible(false);
            message.success('Плейлист успешно создан!');
        } catch (error) {
            console.error("Ошибка при создании плейлиста:", error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Создать новый плейлист"
            okText="Создать"
            okButtonProps={{
                style: { backgroundColor: "black", color: "#fff", borderRadius: "8px" },
              }}
            onCancel={() => setVisible(false)}
            cancelText="Отмена" 
            onOk={handleCreate}
        >
            <PlaylistForm form={form} />
        </Modal>
    );
};