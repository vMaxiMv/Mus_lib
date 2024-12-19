import { Form, message, Modal } from "antd"

import TrackForm from "./TrackForm";
import { createTrack } from "../../api/tracksApi";

interface CreateTrackFormProps {
    visible: boolean; 
    setVisible: (visible: boolean) => void; 
    onCreate: () => void; 
  }

export const CreateTrackForm: React.FC<CreateTrackFormProps> = ({ visible, setVisible, onCreate }) => {
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            await createTrack(values); 
            form.resetFields();
            onCreate(); 
            setVisible(false);
            message.success('Трек успешно создан!');
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