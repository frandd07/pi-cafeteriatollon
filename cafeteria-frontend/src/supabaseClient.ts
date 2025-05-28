import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nwxxtvptdaphsawlobyn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eHh0dnB0ZGFwaHNhd2xvYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTM1MjIsImV4cCI6MjA1OTMyOTUyMn0.J0r_OCbDF7M4j0x7oCGAcF5s3rNuRSerlWyNSNtGKY8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
