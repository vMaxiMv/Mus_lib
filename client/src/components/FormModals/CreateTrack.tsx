import { Form, message, Modal } from "antd"

import TrackForm from "./TrackForm";
import { IForm } from "../../interfaces/formInterface";
import { useCreateTrackMutation } from "../../api/tracksApi";


export const CreateTrackForm = ({ visible, setVisible }: IForm) => {
    const [form] = Form.useForm();
    const createTrackMutation = useCreateTrackMutation();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            createTrackMutation.mutate(values, {
                onSuccess: () => {
                    form.resetFields();
                    setVisible(false);
                    message.success('Трек успешно создан!');
                },
                onError: (error) => {
                    message.error("Ошибка при добавлении трека");
                    console.error("Ошибка при добавлении трека:", error);
                }
            })
        } catch (error) {
            console.error("Ошибка при добавлении трека:", error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Добавить новый трек"
            okText="Добавить"
            okButtonProps={{
                style: { backgroundColor: "black", color: "#fff", borderRadius: "8px" },
              }}
            onCancel={() => setVisible(false)}
            cancelText="Отмена" 
            onOk={handleCreate}
        >
            <TrackForm form={form} />
        </Modal>
    );
};