// PlantForm.js
import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, Select } from "antd";
import { IMusician } from "../../interfaces/tracksInterfaces";
import { getMusiciansQuery } from "../../api/musicianApi";

interface TrackFormProps {
    form: FormInstance; // Указываем тип для form
  }

const TrackForm: React.FC<TrackFormProps>  = ({ form }) => {
    const [musicians, setMusicians] = useState<IMusician[]>([]);
    useEffect(()=>{
        const musiciansList = async () => {
            try {
                const data = await getMusiciansQuery()
                setMusicians(data);
            }
            catch (error) {
                console.error("Ошибка при получении музыканта:", error);
            }
        }
        musiciansList()
    }, [])

    const handleMusicianSelect = (value:string) => {
        console.log("Выбран музыкант с id:", value);

      };
    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label="Название трека"
                name="track_name"
                rules={[{ required: true, message: "Введите название трека!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Продолжительность трека"
                name="duration"
                rules={[{ required: true, message: "Введите длительность трека!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Музыкант"
                name="musician"
                rules={[{ required: true, message: 'Выберите музыканта!' }]}
            >
             <Select placeholder="Выберите музыканта" onChange={handleMusicianSelect}>
                {musicians.map((musician) => (
                    <Select.Option key={musician.musician_id} value={musician.musician_id}>
                        {musician.name}
                    </Select.Option>
                ))}
        </Select>
      </Form.Item>
        </Form>
    );
};

export default TrackForm;