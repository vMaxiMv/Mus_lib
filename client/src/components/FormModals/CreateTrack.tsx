import { Form, Modal } from "antd"

import TrackForm from "./TrackForm";
import { createTrack } from "../../api/tracksApi";

interface CreatePlantFormProps {
    visible: boolean; 
    setVisible: (visible: boolean) => void; 
    onCreate: () => void; 
  }

export const CreatePlantForm: React.FC<CreatePlantFormProps> = ({ visible, setVisible, onCreate }) => {
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            await createTrack(values); 
            form.resetFields();
            onCreate(); 
            setVisible(false);
        } catch (error) {
            console.error("Ошибка при добавлении трека:", error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Добавить новый трек"
            okText="Добавить"
            onCancel={() => setVisible(false)}
            onOk={handleCreate}
        >
            <TrackForm form={form} />
        </Modal>
    );
};