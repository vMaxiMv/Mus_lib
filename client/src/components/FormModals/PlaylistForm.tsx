import { Button, Form, Input, Upload} from "antd"
import { TrackFormProps } from "../../interfaces/formInterface";
import { UploadOutlined } from "@ant-design/icons";



export const PlaylistForm: React.FC<TrackFormProps> = ({form }) => {
   
    const handleFileChange = (info: any) => {
        if (info.file.status === "done" || info.file.originFileObj) {
            const file = info.file.originFileObj || info.file;
            form.setFieldsValue({ cover_image_url: { file } }); 
        }
    };
    return (
        <Form form={form} layout="vertical">
        <Form.Item
            label="Название плейлиста"
            name="name"
            rules={[{ required: true, message: "Введите название плейлиста!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Описание плейлиста"
            name="description"
            rules={[{ required: true, message: "Введите описание плейлиста!" }]}
        >
            <Input.TextArea />
        </Form.Item>
        <Form.Item
                label="Обложка плейлиста"
                name="cover_image_url"
                valuePropName="file" 
                rules={[{ required: true, message: "Загрузите обложку плейлиста!" }]}
            >
                <Upload
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                    maxCount={1} 
                >
                    <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
                </Upload>
            </Form.Item>
    </Form>
    );
};