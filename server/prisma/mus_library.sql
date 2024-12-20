--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-20 14:12:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 226 (class 1255 OID 26813)
-- Name: add_new_album(character varying, integer, character varying, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.add_new_album(IN p_title character varying, IN p_track_count integer, IN p_cover_image_url character varying, IN p_release_year integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO albums (title, track_count, cover_image_url, release_year, created_at, updated_at)
    VALUES (p_title, p_track_count, p_cover_image_url, p_release_year, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END;
$$;


ALTER PROCEDURE public.add_new_album(IN p_title character varying, IN p_track_count integer, IN p_cover_image_url character varying, IN p_release_year integer) OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 26810)
-- Name: add_new_track(character varying, character varying, uuid, uuid); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.add_new_track(IN p_title character varying, IN p_duration character varying, IN p_musician_id uuid, IN p_album_id uuid)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO tracks (title, duration, musician_id, album_id, created_at, updated_at)
    VALUES (p_title, p_duration, p_musician_id, p_album_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END;
$$;


ALTER PROCEDURE public.add_new_track(IN p_title character varying, IN p_duration character varying, IN p_musician_id uuid, IN p_album_id uuid) OWNER TO postgres;

--
-- TOC entry 227 (class 1255 OID 26814)
-- Name: count_tracks_by_musician(character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.count_tracks_by_musician(IN p_musician_name character varying, OUT track_count integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    SELECT COUNT(*) INTO track_count
    FROM tracks t
    JOIN musician m ON t.musician_id = m.musician_id
    WHERE m.name = p_musician_name;
END;
$$;


ALTER PROCEDURE public.count_tracks_by_musician(IN p_musician_name character varying, OUT track_count integer) OWNER TO postgres;

--
-- TOC entry 224 (class 1255 OID 26811)
-- Name: remove_track_from_playlist(uuid, uuid); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.remove_track_from_playlist(IN p_playlist_id uuid, IN p_track_id uuid)
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM playlist_tracks
    WHERE playlist_id = p_playlist_id AND track_id = p_track_id;
END;
$$;


ALTER PROCEDURE public.remove_track_from_playlist(IN p_playlist_id uuid, IN p_track_id uuid) OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 26812)
-- Name: update_playlist_name(uuid, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.update_playlist_name(IN p_playlist_id uuid, IN p_new_name character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE playlists
    SET name = p_new_name, updated_at = CURRENT_TIMESTAMP
    WHERE playlist_id = p_playlist_id;
END;
$$;


ALTER PROCEDURE public.update_playlist_name(IN p_playlist_id uuid, IN p_new_name character varying) OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 26807)
-- Name: update_playlist_track_on_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_playlist_track_on_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_playlist_track_on_change() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 26731)
-- Name: albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.albums (
    album_id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    track_count integer NOT NULL,
    cover_image_url character varying,
    release_year integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT albums_release_year_check CHECK (((release_year >= 1800) AND ((release_year)::numeric <= EXTRACT(year FROM CURRENT_DATE)))),
    CONSTRAINT albums_track_count_check CHECK ((track_count >= 1))
);


ALTER TABLE public.albums OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 26720)
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genre_id uuid DEFAULT gen_random_uuid() NOT NULL,
    genre_name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26710)
-- Name: musician; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.musician (
    musician_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    birth_date date,
    country character varying
);


ALTER TABLE public.musician OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 26792)
-- Name: playlist_tracks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlist_tracks (
    playlist_id uuid NOT NULL,
    track_id uuid NOT NULL
);


ALTER TABLE public.playlist_tracks OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 26780)
-- Name: playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists (
    playlist_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    cover_image_url character varying,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.playlists OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 26765)
-- Name: track_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.track_genres (
    track_id uuid NOT NULL,
    genre_id uuid NOT NULL
);


ALTER TABLE public.track_genres OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 26743)
-- Name: tracks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracks (
    track_id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    duration character varying,
    musician_id uuid,
    album_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tracks OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 26731)
-- Dependencies: 217
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albums (album_id, title, track_count, cover_image_url, release_year, created_at, updated_at) FROM stdin;
1de10394-dc69-427c-b6f4-890a5af05490	Мадам	17	https://example.com/covers/madam.jpg	1998	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
3a6667c3-24fc-4deb-afba-747ced2b586b	Как в старой сказке	17	https://example.com/covers/skazka.jpg	2001	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
cf2e289d-0a71-4bff-af85-ce90dccc6b65	Акустический альбом	18	https://example.com/covers/kuklaKolduna.jpg	1990	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
6d347edd-42eb-410a-a90f-b10178092a53	I am	21	https://example.com/covers/Iam.jpg	2024	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
cde1ccd7-3acc-448e-b6c6-c32dabdc623f	Горгород	11	https://example.com/covers/Gorgorod.jpg	2015	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
0c8120c5-c221-4688-80f1-86589fee84d0	Nevermind	12	https://example.com/covers/Nevermind.jpg	1991	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	Mutter	11	https://example.com/covers/Mutter.jpg	2001	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
9f5027b0-5fed-4a2b-ba69-993bef89a17b	Sehnsucht	11	https://example.com/covers/Sehnsucht.jpg	1997	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
f621afb4-bcca-45c1-ad62-1842684315ca	Reise, Reise	11	https://example.com/covers/Reise.jpg	2004	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
bc46c453-ae0d-4e79-9365-562f5fea4d07	Abbey Road	17	https://example.com/covers/abbey_road.jpg	1969	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
e67a3b25-67a8-4137-9255-ae8977065452	A Night at the Opera	17	https://example.com/covers/Opera.jpg	1975	2024-12-19 19:49:30.021042	2024-12-19 19:49:30.021042
\.


--
-- TOC entry 4851 (class 0 OID 26720)
-- Dependencies: 216
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (genre_id, genre_name, created_at) FROM stdin;
d2d091ae-e360-41a1-8c7d-6d76f6820f5c	Рок	2024-12-19 19:42:31.071245
047cdfa2-9ef5-4ff9-a958-80803117dbb0	Рэп	2024-12-19 19:42:31.071245
58568f93-5d35-484a-a32e-b33a565c5d80	Классика	2024-12-19 19:42:31.071245
87fb7590-cea9-4c11-8160-7b105f1d3317	Шансон	2024-12-19 19:42:31.071245
7d41e86d-76f9-4b1c-a74e-13d675b3d5a7	Поп	2024-12-19 19:42:31.071245
d5481472-9464-4526-bf60-48523a947dcc	Фонк	2024-12-19 19:42:31.071245
50af1ce6-66cb-4663-b699-45b53bce8748	Панк-рок	2024-12-19 19:42:31.071245
d1cac0ec-0bd8-4ff8-98b8-52935d2555ad	Дабстеп	2024-12-19 19:42:31.071245
73e78102-3aa2-4b41-9d92-90f8ba6890ac	Джаз	2024-12-19 19:42:31.071245
d9c5df0c-19f1-4bcf-a446-125a43ded475	Блюз	2024-12-19 19:42:31.071245
a5b16e20-ec40-4eba-a200-c09a100bf9c4	Регги	2024-12-19 19:42:31.071245
fe6b8057-e751-495d-9538-4347f99f6929	Хип хоп	2024-12-19 19:42:31.071245
\.


--
-- TOC entry 4850 (class 0 OID 26710)
-- Dependencies: 215
-- Data for Name: musician; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.musician (musician_id, name, birth_date, country) FROM stdin;
d824f6aa-9a43-425f-bafa-9f452722298c	Macan	2002-01-06	Россия
8b5435f8-6e5c-4ffc-90da-9430ad08633a	Михаил Круг	1962-04-07	Россия
381a8294-cdde-403d-bb4e-b74a44d3e960	Oxxxymiron	1985-01-31	Россия
d9d40e3e-9b06-4de1-a004-116af9400d78	Петр Чайковский	1840-05-07	Россия
a107c216-61e2-4a07-9dde-f5a111e0f3e7	Король и шут	1988-01-01	Россия
0bad47a0-5552-4d4e-9532-01bcfb9a76c0	Queen	1970-01-01	UK
8465f334-67b0-4bc0-922f-0e3f983eee42	The Beatles	1960-01-01	UK
7b18acc7-da1b-4958-bfdb-457931bef6bc	Little Big	1987-01-01	Россия
62d82bc6-b789-4106-9542-e07d0b794f80	Rammstein	1994-01-01	Germany
588d2b52-66b2-4dd7-952f-a656ecf05a6f	Nirvana	1960-01-01	USA
\.


--
-- TOC entry 4856 (class 0 OID 26792)
-- Dependencies: 221
-- Data for Name: playlist_tracks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlist_tracks (playlist_id, track_id) FROM stdin;
7ff56e3a-341c-46aa-81b2-65f47dbdd06d	c7f8c74f-f93f-48d4-89ed-f441f55a8c39
c2bdc63f-c35b-4619-91a0-79d4f4fd44d1	315bbf0c-c6f5-4544-8a57-80dd0efaf020
c2bdc63f-c35b-4619-91a0-79d4f4fd44d1	43788567-ada4-47c2-a4c8-fb1121065bd9
c2bdc63f-c35b-4619-91a0-79d4f4fd44d1	2033f479-7008-49a1-bfa8-6407e90cff01
2eccddc9-02bf-4994-b800-bf658c3a4586	fbf3b97a-17d3-4722-8412-edbae17ef6e4
2eccddc9-02bf-4994-b800-bf658c3a4586	e97acca6-e965-4876-a879-9afddb32c762
2eccddc9-02bf-4994-b800-bf658c3a4586	10492e42-2760-4e89-a5fc-76ce35bb2792
1c16dc47-0a60-4d27-b401-acbbb8c8e046	198e3ae6-e8db-48c3-b56c-c3b8203a20f7
1c16dc47-0a60-4d27-b401-acbbb8c8e046	f88577a5-931b-4d43-acd5-275bf20a2287
1c16dc47-0a60-4d27-b401-acbbb8c8e046	2033f479-7008-49a1-bfa8-6407e90cff01
1c16dc47-0a60-4d27-b401-acbbb8c8e046	2dd71353-ed16-4873-8512-b2caf7d397f7
1c16dc47-0a60-4d27-b401-acbbb8c8e046	60eb9b04-a810-4a4f-8ee9-386e35e3c895
b0e89331-2eba-4988-9858-b87ca5dff74d	ca454b01-2b6a-4f8d-91c1-36401c094c3d
b0e89331-2eba-4988-9858-b87ca5dff74d	480523ba-0b75-46cc-8418-5b5304793461
b0e89331-2eba-4988-9858-b87ca5dff74d	2033f479-7008-49a1-bfa8-6407e90cff01
b0e89331-2eba-4988-9858-b87ca5dff74d	f88577a5-931b-4d43-acd5-275bf20a2287
b0e89331-2eba-4988-9858-b87ca5dff74d	eb0e1c8a-3554-4167-80dd-d459ec86713d
b0e89331-2eba-4988-9858-b87ca5dff74d	198e3ae6-e8db-48c3-b56c-c3b8203a20f7
495cae2b-1f89-4956-b0b4-2c1494114669	27a9ca41-3669-4e4c-b0c3-2a06cbc5da9b
495cae2b-1f89-4956-b0b4-2c1494114669	3162156f-6550-460f-9e6f-9bbd59f00cb7
495cae2b-1f89-4956-b0b4-2c1494114669	9f307f15-f891-49c6-a059-03a8e6058d39
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	2dd71353-ed16-4873-8512-b2caf7d397f7
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	f88577a5-931b-4d43-acd5-275bf20a2287
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	e97acca6-e965-4876-a879-9afddb32c762
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	0a058b61-891b-4e28-8922-5590e569e3d6
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	43788567-ada4-47c2-a4c8-fb1121065bd9
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	60eb9b04-a810-4a4f-8ee9-386e35e3c895
4cb5ee50-0aad-4105-977a-887183fec2a5	f88577a5-931b-4d43-acd5-275bf20a2287
4cb5ee50-0aad-4105-977a-887183fec2a5	60eb9b04-a810-4a4f-8ee9-386e35e3c895
011dfa7f-2853-4513-8783-749b3f406f0e	ca454b01-2b6a-4f8d-91c1-36401c094c3d
011dfa7f-2853-4513-8783-749b3f406f0e	1c42ab24-4f9f-44d0-8caa-9f928cd46c2b
011dfa7f-2853-4513-8783-749b3f406f0e	5643b276-02ff-4719-8f07-d4221dd5fc2a
011dfa7f-2853-4513-8783-749b3f406f0e	c7f8c74f-f93f-48d4-89ed-f441f55a8c39
011dfa7f-2853-4513-8783-749b3f406f0e	eb0e1c8a-3554-4167-80dd-d459ec86713d
011dfa7f-2853-4513-8783-749b3f406f0e	fbf3b97a-17d3-4722-8412-edbae17ef6e4
a4fe2d33-e257-4915-8170-3f215ae5b780	b9366a54-ac82-4ddf-a988-f77b535dd4ce
a4fe2d33-e257-4915-8170-3f215ae5b780	99898656-21a7-4dfd-ba81-2d854e3a7d8d
a4fe2d33-e257-4915-8170-3f215ae5b780	2033f479-7008-49a1-bfa8-6407e90cff01
a4fe2d33-e257-4915-8170-3f215ae5b780	64ecbcd3-ece5-44bd-b157-f6fe74aa6148
\.


--
-- TOC entry 4855 (class 0 OID 26780)
-- Dependencies: 220
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlists (playlist_id, name, cover_image_url, description, created_at, updated_at) FROM stdin;
b0e89331-2eba-4988-9858-b87ca5dff74d	Мой самый любимый плейлист	https://example.com/covers/playlist_cover.jpg	Этот плейлист состоит из моих самых любимых треков	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
011dfa7f-2853-4513-8783-749b3f406f0e	Для учебы	https://example.com/covers/playlist_cover.jpg	Этот плейлист состоит из моих самых любимых треков	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
a4fe2d33-e257-4915-8170-3f215ae5b780	Для тренировки в зале	https://example.com/covers/gym.jpg	Этот плейлист состоит из песен для тренировок в зале	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
86a1ab0c-ecdb-4113-9063-b74b9db4cc8c	Для прогулки	https://example.com/covers/walk.jpg	Этот плейлист состоит из песен для прогулки	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
2eccddc9-02bf-4994-b800-bf658c3a4586	Для работы	https://example.com/covers/work.jpg	Этот плейлист состоит из песен для работы	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
c2bdc63f-c35b-4619-91a0-79d4f4fd44d1	Для кулинарии	https://example.com/covers/cook.jpg	Этот плейлист состоит из песен для приготовления еды	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
495cae2b-1f89-4956-b0b4-2c1494114669	Для пробежки	https://example.com/covers/run.jpg	Этот плейлист состоит из песен для пробежки	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
7ff56e3a-341c-46aa-81b2-65f47dbdd06d	Музыка для путешествий	https://example.com/covers/travel.jpg	Этот плейлист состоит из песен для дальних путешествий	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
4cb5ee50-0aad-4105-977a-887183fec2a5	Для отдыха	https://example.com/covers/relax.jpg	Этот плейлист состоит из песен для отдыха	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
1c16dc47-0a60-4d27-b401-acbbb8c8e046	Детская музыка	https://example.com/covers/child.jpg	Этот плейлист состоит из детских песен	2024-12-19 19:43:22.750358	2024-12-19 19:43:22.750358
\.


--
-- TOC entry 4854 (class 0 OID 26765)
-- Dependencies: 219
-- Data for Name: track_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.track_genres (track_id, genre_id) FROM stdin;
5156b64c-c725-4568-905d-d09797bb7ef4	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
198e3ae6-e8db-48c3-b56c-c3b8203a20f7	fe6b8057-e751-495d-9538-4347f99f6929
198e3ae6-e8db-48c3-b56c-c3b8203a20f7	047cdfa2-9ef5-4ff9-a958-80803117dbb0
ca454b01-2b6a-4f8d-91c1-36401c094c3d	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
480523ba-0b75-46cc-8418-5b5304793461	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
480523ba-0b75-46cc-8418-5b5304793461	50af1ce6-66cb-4663-b699-45b53bce8748
2033f479-7008-49a1-bfa8-6407e90cff01	58568f93-5d35-484a-a32e-b33a565c5d80
f88577a5-931b-4d43-acd5-275bf20a2287	58568f93-5d35-484a-a32e-b33a565c5d80
eb0e1c8a-3554-4167-80dd-d459ec86713d	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
eb0e1c8a-3554-4167-80dd-d459ec86713d	50af1ce6-66cb-4663-b699-45b53bce8748
c7f8c74f-f93f-48d4-89ed-f441f55a8c39	87fb7590-cea9-4c11-8160-7b105f1d3317
60eb9b04-a810-4a4f-8ee9-386e35e3c895	58568f93-5d35-484a-a32e-b33a565c5d80
0a058b61-891b-4e28-8922-5590e569e3d6	047cdfa2-9ef5-4ff9-a958-80803117dbb0
10492e42-2760-4e89-a5fc-76ce35bb2792	047cdfa2-9ef5-4ff9-a958-80803117dbb0
43788567-ada4-47c2-a4c8-fb1121065bd9	fe6b8057-e751-495d-9538-4347f99f6929
43788567-ada4-47c2-a4c8-fb1121065bd9	047cdfa2-9ef5-4ff9-a958-80803117dbb0
315bbf0c-c6f5-4544-8a57-80dd0efaf020	047cdfa2-9ef5-4ff9-a958-80803117dbb0
fbf3b97a-17d3-4722-8412-edbae17ef6e4	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
fbf3b97a-17d3-4722-8412-edbae17ef6e4	50af1ce6-66cb-4663-b699-45b53bce8748
67af0b9a-c047-4ec8-a804-c7b5649fb0a9	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
29b16ac9-c33c-4ec5-b3b8-17e71fd6fefa	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
4a86a203-633a-46aa-b1d8-e737493384b9	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
0360ba70-ee61-4c20-9168-41a4bd66bd6c	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
9f307f15-f891-49c6-a059-03a8e6058d39	047cdfa2-9ef5-4ff9-a958-80803117dbb0
122345e7-cd19-4b34-9189-31c54581b943	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
122345e7-cd19-4b34-9189-31c54581b943	50af1ce6-66cb-4663-b699-45b53bce8748
eea7c634-db88-4c0f-bf64-ea01d32a091e	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
b9366a54-ac82-4ddf-a988-f77b535dd4ce	87fb7590-cea9-4c11-8160-7b105f1d3317
99898656-21a7-4dfd-ba81-2d854e3a7d8d	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
3162156f-6550-460f-9e6f-9bbd59f00cb7	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
0cecf598-9cf3-459b-9aca-7dbb764cd860	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
0cecf598-9cf3-459b-9aca-7dbb764cd860	50af1ce6-66cb-4663-b699-45b53bce8748
27a9ca41-3669-4e4c-b0c3-2a06cbc5da9b	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
27a9ca41-3669-4e4c-b0c3-2a06cbc5da9b	50af1ce6-66cb-4663-b699-45b53bce8748
64ecbcd3-ece5-44bd-b157-f6fe74aa6148	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
2dd71353-ed16-4873-8512-b2caf7d397f7	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
7428b0c7-e2fc-422c-8ee3-efd44cc7b9eb	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
e97acca6-e965-4876-a879-9afddb32c762	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
e97acca6-e965-4876-a879-9afddb32c762	50af1ce6-66cb-4663-b699-45b53bce8748
1c42ab24-4f9f-44d0-8caa-9f928cd46c2b	d2d091ae-e360-41a1-8c7d-6d76f6820f5c
\.


--
-- TOC entry 4853 (class 0 OID 26743)
-- Dependencies: 218
-- Data for Name: tracks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tracks (track_id, title, duration, musician_id, album_id, created_at, updated_at) FROM stdin;
5643b276-02ff-4719-8f07-d4221dd5fc2a	Ich Will	03:37:00	62d82bc6-b789-4106-9542-e07d0b794f80	fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
fbf3b97a-17d3-4722-8412-edbae17ef6e4	Тяни	03:35:00	a107c216-61e2-4a07-9dde-f5a111e0f3e7	1de10394-dc69-427c-b6f4-890a5af05490	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
99898656-21a7-4dfd-ba81-2d854e3a7d8d	Engel	04:24:00	62d82bc6-b789-4106-9542-e07d0b794f80	9f5027b0-5fed-4a2b-ba69-993bef89a17b	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
3162156f-6550-460f-9e6f-9bbd59f00cb7	Links 2-3-4	03:36:00	62d82bc6-b789-4106-9542-e07d0b794f80	fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
0cecf598-9cf3-459b-9aca-7dbb764cd860	Smells Like Teen Spirit	05:01:00	588d2b52-66b2-4dd7-952f-a656ecf05a6f	0c8120c5-c221-4688-80f1-86589fee84d0	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
ca454b01-2b6a-4f8d-91c1-36401c094c3d	Sonne	04:32:00	62d82bc6-b789-4106-9542-e07d0b794f80	fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
27a9ca41-3669-4e4c-b0c3-2a06cbc5da9b	Come as You Are	03:38:00	588d2b52-66b2-4dd7-952f-a656ecf05a6f	0c8120c5-c221-4688-80f1-86589fee84d0	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
480523ba-0b75-46cc-8418-5b5304793461	Кукла колдуна	04:00:00	a107c216-61e2-4a07-9dde-f5a111e0f3e7	cf2e289d-0a71-4bff-af85-ce90dccc6b65	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
2033f479-7008-49a1-bfa8-6407e90cff01	Времена года	05:00:00	d9d40e3e-9b06-4de1-a004-116af9400d78	\N	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
f88577a5-931b-4d43-acd5-275bf20a2287	Лебединое озеро	05:10:00	d9d40e3e-9b06-4de1-a004-116af9400d78	\N	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
64ecbcd3-ece5-44bd-b157-f6fe74aa6148	Amour	04:49:00	62d82bc6-b789-4106-9542-e07d0b794f80	f621afb4-bcca-45c1-ad62-1842684315ca	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
eb0e1c8a-3554-4167-80dd-d459ec86713d	Проклятый старый дом	04:20:00	a107c216-61e2-4a07-9dde-f5a111e0f3e7	1de10394-dc69-427c-b6f4-890a5af05490	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
2dd71353-ed16-4873-8512-b2caf7d397f7	Mutter	04:28:00	62d82bc6-b789-4106-9542-e07d0b794f80	fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
c7f8c74f-f93f-48d4-89ed-f441f55a8c39	Владимирский централ	02:30:00	8b5435f8-6e5c-4ffc-90da-9430ad08633a	\N	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
60eb9b04-a810-4a4f-8ee9-386e35e3c895	Щелкунчик	03:05:00	d9d40e3e-9b06-4de1-a004-116af9400d78	\N	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
0a058b61-891b-4e28-8922-5590e569e3d6	Город под подошвой	04:15:00	381a8294-cdde-403d-bb4e-b74a44d3e960	cde1ccd7-3acc-448e-b6c6-c32dabdc623f	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
10492e42-2760-4e89-a5fc-76ce35bb2792	Переплетено	02:40:00	381a8294-cdde-403d-bb4e-b74a44d3e960	cde1ccd7-3acc-448e-b6c6-c32dabdc623f	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
43788567-ada4-47c2-a4c8-fb1121065bd9	Май	03:55:00	d824f6aa-9a43-425f-bafa-9f452722298c	6d347edd-42eb-410a-a90f-b10178092a53	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
315bbf0c-c6f5-4544-8a57-80dd0efaf020	Неваляшка	04:10:00	381a8294-cdde-403d-bb4e-b74a44d3e960	cde1ccd7-3acc-448e-b6c6-c32dabdc623f	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
7428b0c7-e2fc-422c-8ee3-efd44cc7b9eb	Mein Herz Brennt	04:39:00	62d82bc6-b789-4106-9542-e07d0b794f80	fe3cb70d-9102-4f5a-af0f-e0dcfff9a2f9	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
e97acca6-e965-4876-a879-9afddb32c762	In Bloom	04:14:00	588d2b52-66b2-4dd7-952f-a656ecf05a6f	0c8120c5-c221-4688-80f1-86589fee84d0	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
67af0b9a-c047-4ec8-a804-c7b5649fb0a9	Amerika	03:46:00	62d82bc6-b789-4106-9542-e07d0b794f80	f621afb4-bcca-45c1-ad62-1842684315ca	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
29b16ac9-c33c-4ec5-b3b8-17e71fd6fefa	Du Hast	03:54:00	62d82bc6-b789-4106-9542-e07d0b794f80	9f5027b0-5fed-4a2b-ba69-993bef89a17b	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
4a86a203-633a-46aa-b1d8-e737493384b9	Here comes the Sun	03:12:00	8465f334-67b0-4bc0-922f-0e3f983eee42	bc46c453-ae0d-4e79-9365-562f5fea4d07	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
0360ba70-ee61-4c20-9168-41a4bd66bd6c	Heart-Shaped Box	04:41:00	588d2b52-66b2-4dd7-952f-a656ecf05a6f	0c8120c5-c221-4688-80f1-86589fee84d0	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
9f307f15-f891-49c6-a059-03a8e6058d39	Там где нас нет	04:25:00	381a8294-cdde-403d-bb4e-b74a44d3e960	cde1ccd7-3acc-448e-b6c6-c32dabdc623f	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
122345e7-cd19-4b34-9189-31c54581b943	Lithium	04:17:00	588d2b52-66b2-4dd7-952f-a656ecf05a6f	0c8120c5-c221-4688-80f1-86589fee84d0	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
eea7c634-db88-4c0f-bf64-ea01d32a091e	The Show Must Go On	04:23:00	0bad47a0-5552-4d4e-9532-01bcfb9a76c0	e67a3b25-67a8-4137-9255-ae8977065452	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
b9366a54-ac82-4ddf-a988-f77b535dd4ce	Тишина	02:45:00	8b5435f8-6e5c-4ffc-90da-9430ad08633a	\N	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
1c42ab24-4f9f-44d0-8caa-9f928cd46c2b	Yesterday	02:33:00	8465f334-67b0-4bc0-922f-0e3f983eee42	bc46c453-ae0d-4e79-9365-562f5fea4d07	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
5156b64c-c725-4568-905d-d09797bb7ef4	Bohemian Rhapsody	05:55:00	0bad47a0-5552-4d4e-9532-01bcfb9a76c0	e67a3b25-67a8-4137-9255-ae8977065452	2024-12-19 19:52:22.726569	2024-12-19 19:52:22.726569
198e3ae6-e8db-48c3-b56c-c3b8203a20f7	I AM	03:50:00	d824f6aa-9a43-425f-bafa-9f452722298c	6d347edd-42eb-410a-a90f-b10178092a53	2024-12-19 19:52:22.726569	2024-12-19 20:08:42.58755
\.


--
-- TOC entry 4686 (class 2606 OID 26742)
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (album_id);


--
-- TOC entry 4682 (class 2606 OID 26730)
-- Name: genres genres_genre_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_genre_name_key UNIQUE (genre_name);


--
-- TOC entry 4684 (class 2606 OID 26728)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genre_id);


--
-- TOC entry 4678 (class 2606 OID 26719)
-- Name: musician musician_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.musician
    ADD CONSTRAINT musician_name_key UNIQUE (name);


--
-- TOC entry 4680 (class 2606 OID 26717)
-- Name: musician musician_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.musician
    ADD CONSTRAINT musician_pkey PRIMARY KEY (musician_id);


--
-- TOC entry 4698 (class 2606 OID 26796)
-- Name: playlist_tracks playlist_tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_tracks
    ADD CONSTRAINT playlist_tracks_pkey PRIMARY KEY (playlist_id, track_id);


--
-- TOC entry 4694 (class 2606 OID 26791)
-- Name: playlists playlists_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_name_key UNIQUE (name);


--
-- TOC entry 4696 (class 2606 OID 26789)
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (playlist_id);


--
-- TOC entry 4692 (class 2606 OID 26769)
-- Name: track_genres track_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track_genres
    ADD CONSTRAINT track_genres_pkey PRIMARY KEY (track_id, genre_id);


--
-- TOC entry 4688 (class 2606 OID 26752)
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (track_id);


--
-- TOC entry 4690 (class 2606 OID 26754)
-- Name: tracks unique_track_musician; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT unique_track_musician UNIQUE (title, musician_id);


--
-- TOC entry 4706 (class 2620 OID 26808)
-- Name: playlists update_playlist_on_change_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_playlist_on_change_trigger BEFORE UPDATE ON public.playlists FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_playlist_track_on_change();


--
-- TOC entry 4705 (class 2620 OID 26809)
-- Name: tracks update_track_on_change_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_track_on_change_trigger BEFORE UPDATE ON public.tracks FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_playlist_track_on_change();


--
-- TOC entry 4703 (class 2606 OID 26797)
-- Name: playlist_tracks playlist_tracks_playlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_tracks
    ADD CONSTRAINT playlist_tracks_playlist_id_fkey FOREIGN KEY (playlist_id) REFERENCES public.playlists(playlist_id) ON DELETE CASCADE;


--
-- TOC entry 4704 (class 2606 OID 26802)
-- Name: playlist_tracks playlist_tracks_track_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_tracks
    ADD CONSTRAINT playlist_tracks_track_id_fkey FOREIGN KEY (track_id) REFERENCES public.tracks(track_id) ON DELETE CASCADE;


--
-- TOC entry 4701 (class 2606 OID 26775)
-- Name: track_genres track_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track_genres
    ADD CONSTRAINT track_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(genre_id) ON DELETE CASCADE;


--
-- TOC entry 4702 (class 2606 OID 26770)
-- Name: track_genres track_genres_track_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track_genres
    ADD CONSTRAINT track_genres_track_id_fkey FOREIGN KEY (track_id) REFERENCES public.tracks(track_id) ON DELETE CASCADE;


--
-- TOC entry 4699 (class 2606 OID 26760)
-- Name: tracks tracks_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.albums(album_id);


--
-- TOC entry 4700 (class 2606 OID 26755)
-- Name: tracks tracks_musician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_musician_id_fkey FOREIGN KEY (musician_id) REFERENCES public.musician(musician_id);


-- Completed on 2024-12-20 14:12:51

--
-- PostgreSQL database dump complete
--

