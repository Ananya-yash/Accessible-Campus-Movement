-- Campus buildings table for the Accessible Campus Movement portal.
-- Tracks the real-time accessibility status of each building's
-- ramps, lifts, and stairs.

CREATE TABLE IF NOT EXISTS buildings (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100)       NOT NULL UNIQUE,
    latitude       DOUBLE PRECISION   NOT NULL,
    longitude      DOUBLE PRECISION   NOT NULL,
    ramp_status    TEXT               NOT NULL CHECK (ramp_status    IN ('Open', 'Blocked')),
    lift_status    TEXT               NOT NULL CHECK (lift_status    IN ('Working', 'Not Working')),
    stairs_status  TEXT               NOT NULL CHECK (stairs_status  IN ('Open', 'Closed'))
);

