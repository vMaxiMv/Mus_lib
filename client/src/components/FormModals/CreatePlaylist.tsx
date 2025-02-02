import { Form, message, Modal } from "antd"
import { IForm } from "../../interfaces/formInterface";
import { useCreatePlaylistMutation } from "../../api/playlistApi";
import { PlaylistForm } from "./PlaylistForm";


export const CreatePlaylistForm = ({ visible, setVisible}: IForm) => {
    const [form] = Form.useForm();
    const createPlaylistMutation = useCreatePlaylistMutation()

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

            
            createPlaylistMutation.mutate(formData, {
                onSuccess: () => {
                    form.resetFields();
                    setVisible(false);
                    message.success('Плейлист успешно создан!');
                },
                onError: (error) => {
                    message.error("Ошибка при добавлении плейлиста");
                    console.error("Ошибка при добавлении плейлиста:", error);
                }
            })
            
            
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