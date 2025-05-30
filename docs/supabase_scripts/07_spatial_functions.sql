// This file creates a stored procedure in Supabase for finding stories by location
// It uses PostGIS to perform spatial queries based on geographic coordinates

-- Create a stored procedure for finding stories by location
CREATE OR REPLACE FUNCTION find_stories_by_location(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 100
)
RETURNS SETOF stories
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT s.*
  FROM stories s
  JOIN story_locations sl ON s.id = sl.story_id
  JOIN locations l ON sl.location_id = l.id
  WHERE ST_DWithin(
    l.geo_point,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius_km * 1000  -- Convert km to meters
  )
  ORDER BY 
    ST_Distance(
      l.geo_point, 
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    );
END;
$$;
