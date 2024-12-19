import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, Select } from "antd";
import { IGenre, IMusician } from "../../interfaces/tracksInterfaces";
import { getMusiciansQuery } from "../../api/musicianApi";
import { getGenresQuery } from "../../api/genresApi";

interface TrackFormProps {
    form: FormInstance; // Указываем тип для form
  }

const TrackForm: React.FC<TrackFormProps>  = ({ form }) => {
    const [musicians, setMusicians] = useState<IMusician[]>([]);
    const [genres, setGenres] = useState<IGenre[]>([]);

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

        const genreList = async () => {
            try {
                const data = await getGenresQuery()
                setGenres(data);
            }
            catch (error) {
                console.error("Ошибка при получении музыканта:", error);
            }
        }

        musiciansList()
        genreList()
    }, [])

    const handleMusicianSelect = (value:string) => {
        console.log("Выбран музыкант с id:", value);
    };
      
    const handleGenresSelect = (values: string[]) => {
        console.log("Выбраны жанры с id:", values);
    };
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
             <Select placeholder="Выберите музыканта" onChange={handleMusicianSelect}>
                {musicians.map((musician) => (
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
                    onChange={handleGenresSelect}
                >
                    {genres.map((genre) => (
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