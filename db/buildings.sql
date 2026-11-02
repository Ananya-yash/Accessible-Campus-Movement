-- Campus buildings table for the Accessible Campus Movement portal.
-- Tracks the real-time accessibility status of each building's
-- ramps, lifts, and stairs.
--
-- Run this file against your PostgreSQL database to create the table
-- and seed the initial building rows. It is safe to run multiple times:
--   psql $DATABASE_URL -f db/buildings.sql

CREATE TABLE IF NOT EXISTS buildings (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100)       NOT NULL UNIQUE,
    latitude       DOUBLE PRECISION   NOT NULL,
    longitude      DOUBLE PRECISION   NOT NULL,
    ramp_status    TEXT               NOT NULL CHECK (ramp_status    IN ('Open', 'Blocked')),
    lift_status    TEXT               NOT NULL CHECK (lift_status    IN ('Working', 'Not Working')),
    stairs_status  TEXT               NOT NULL CHECK (stairs_status  IN ('Open', 'Closed'))
);

-- ---------------------------------------------------------------------------
-- Seed data
-- Coordinates sourced from src/data/campusBuildings.js (sample-* entries).
-- ON CONFLICT (name) DO NOTHING makes this script idempotent.
-- ---------------------------------------------------------------------------

INSERT INTO buildings (name, latitude, longitude, ramp_status, lift_status, stairs_status) VALUES
    ('Block 34',         31.25147572875457,  75.70505520205897, 'Open',    'Not Working', 'Open'),
    ('Block 32',         31.252148515191983, 75.70505888143154, 'Open',    'Working',     'Open'),
    ('Central Library',  31.251950504660904, 75.70380780710491, 'Blocked', 'Working',     'Open'),
    ('Uni Mall',         31.25580956883715,  75.70564872290824, 'Open',    'Working',     'Closed'),
    ('Block 27',         31.25291483493356,  75.70330975549413, 'Blocked', 'Not Working', 'Open')
ON CONFLICT (name) DO NOTHING;

