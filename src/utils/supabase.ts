import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://jjllwsqslqzzrvzqpquv.supabase.co'

export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbGx3c3FzbHF6enJ2enFwcXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MDU5MDYsImV4cCI6MjEwODE4MTkwNn0.SzeB-VYvs_km1LTa4WrYX6XHeBD_Q4BIICgbFCtAUCc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
