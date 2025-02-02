import React from "react";
import { Form, Input, Select } from "antd";
import { useGetGenresQuery } from "../../api/genresApi";
import { TrackFormProps } from "../../interfaces/formInterface";
import { useGetMusiciansQuery } from "../../api/musicianApi";



const TrackForm = ({ form }: TrackFormProps) => {
    const {data: genres} = useGetGenresQuery()
    const {data: musicians} = useGetMusiciansQuery()

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label="Название трека"
                name="title"
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
                name="musician_id"
                rules={[{ required: true, message: 'Выберите музыканта!' }]}
            >
             <Select placeholder="Выберите музыканта">
                {musicians?.map((musician) => (
                    <Select.Option key={musician.musician_id} value={musician.musician_id}>
                        {musician.name}
                    </Select.Option>
                ))}
        </Select>
      </Form.Item>
      <Form.Item
                label="Жанры"
                name="genres"
                rules={[{ required: true, message: "Выберите хотя бы один жанр!" }]}
            >
                <Select
                    mode="multiple" // Режим множественного выбора
                    placeholder="Выберите жанры"
                >
                    {genres?.map((genre) => (
                        <Select.Option key={genre.genre_id} value={genre.genre_id}>
                            {genre.genre_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default TrackForm;