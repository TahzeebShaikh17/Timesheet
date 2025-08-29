--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-09 02:03:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE truck_park_nc8;
--
-- TOC entry 4897 (class 1262 OID 16388)
-- Name: truck_park_nc8; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE truck_park_nc8 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';


ALTER DATABASE truck_park_nc8 OWNER TO postgres;

\connect truck_park_nc8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 258 (class 1255 OID 16480)
-- Name: fn_check_refresh_token_exists(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_check_refresh_token_exists(ip_uuid uuid, ip_refresh_token text) RETURNS boolean
    LANGUAGE sql
    AS $$
    SELECT EXISTS(
        SELECT 1
        FROM users
        WHERE uuid = ip_uuid
          AND refresh_token = ip_refresh_token
          AND is_active = TRUE
    );
$$;


ALTER FUNCTION public.fn_check_refresh_token_exists(ip_uuid uuid, ip_refresh_token text) OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 16479)
-- Name: fn_get_user_by_email_password(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_get_user_by_email_password(ip_email_id text, ip_password text) RETURNS TABLE(uuid uuid, email_id text, full_name text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.uuid,
        u.email_id,
        u.full_name
    FROM users u
    WHERE 
        u.email_id = ip_email_id
        AND encode(
            digest(ip_password || u.salt_key, 'sha1'),
            'hex'
        ) = u.password_hash
        AND u.is_active = TRUE;
END;
$$;


ALTER FUNCTION public.fn_get_user_by_email_password(ip_email_id text, ip_password text) OWNER TO postgres;

--
-- TOC entry 259 (class 1255 OID 16481)
-- Name: fn_update_refresh_token(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_update_refresh_token(ip_uuid uuid, ip_refresh_token text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE users
    SET refresh_token = ip_refresh_token
    WHERE uuid = ip_uuid;

    -- Return TRUE if a row was actually updated
    RETURN FOUND;
END;
$$;


ALTER FUNCTION public.fn_update_refresh_token(ip_uuid uuid, ip_refresh_token text) OWNER TO postgres;

--
-- TOC entry 256 (class 1255 OID 16476)
-- Name: set_timestamps(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_timestamps() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- On INSERT: set both created_at and updated_at
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = CURRENT_TIMESTAMP;
        NEW.updated_at = CURRENT_TIMESTAMP;

    -- On UPDATE: only update updated_at
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_timestamps() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16463)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    email_id text NOT NULL,
    full_name text NOT NULL,
    password_hash text NOT NULL,
    salt_key text NOT NULL,
    refresh_token text,
    is_active boolean DEFAULT true NOT NULL,
    created_by_id bigint DEFAULT '-1'::integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by_id bigint,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16462)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4736 (class 2604 OID 16466)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4891 (class 0 OID 16463)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, uuid, email_id, full_name, password_hash, salt_key, refresh_token, is_active, created_by_id, created_at, updated_by_id, updated_at) FROM stdin;
1	5fdbe307-bd1a-4e52-ac20-abbbfd8101de	sameer.bidi@edgeaxis.in	Sameer Bidi	bed53bc3e3db1f4baa31c65a4107cb5bddd51bca	ezsalt	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWZkYmUzMDctYmQxYS00ZTUyLWFjMjAtYWJiYmZkODEwMWRlIiwiZXhwIjoxNzU0NzcwOTU4LCJpc3MiOiJUcnVja1BhcmtOQzhBUEkiLCJhdWQiOiJUcnVja1BhcmtOQzhXRUIifQ.NEaDySnl3xRFW6BRh_26ekmAzUDu6C9oiM2jxxjJV5w	t	-1	2025-08-08 23:47:59.635037+05:30	\N	2025-08-09 01:52:38.331382+05:30
\.


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4743 (class 2606 OID 16475)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id, uuid);


--
-- TOC entry 4744 (class 2620 OID 16477)
-- Name: users set_users_timestamps; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_users_timestamps BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_timestamps();


-- Completed on 2025-08-09 02:03:52

--
-- PostgreSQL database dump complete
--

