import { Form, message, Modal } from "antd"

import TrackForm from "./TrackForm";
import { createTrack } from "../../api/tracksApi";
import { IForm } from "../../interfaces/formInterface";


export const CreateTrackForm: React.FC<IForm> = ({ visible, setVisible, onCreateUpdate }) => {
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            await createTrack(values); 
            form.resetFields();
            onCreateUpdate(); 
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