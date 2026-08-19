-- ==========================================================================
-- ARPON — MALAYSIA 2027 | SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================================

-- 1. Create the checklist table
CREATE TABLE IF NOT EXISTS public.arpon_todos (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.arpon_todos ENABLE ROW LEVEL SECURITY;

-- 3. Create permissive policies for anonymous / authenticated student client
CREATE POLICY "Allow student read access" 
ON public.arpon_todos FOR SELECT 
USING (true);

CREATE POLICY "Allow student insert access" 
ON public.arpon_todos FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow student update access" 
ON public.arpon_todos FOR UPDATE 
USING (true);

-- 4. Enable Realtime broadcast on this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.arpon_todos;
