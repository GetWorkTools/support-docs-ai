import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The Supabase URL from the environment variables.
 * @type {string}
 */
const supabaseUrl: string = process.env.SUPABASE_URL ?? "";

/**
 * The Supabase service role key from the environment variables.
 * @type {string}
 */
const supabaseKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * A Supabase client instance.
 * @type {SupabaseClient<any, "public", any>}
 */
let supabaseClient: SupabaseClient<any, "public", any>;

/**
 * Get or create a Supabase client instance.
 * @returns {SupabaseClient<any, "public", any>} The Supabase client instance.
 */
const getSupabaseClient = (): SupabaseClient<any, "public", any> => {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);

  return supabaseClient;
};

/**
 * Get a Supabase client instance.
 * @returns {SupabaseClient<any, "public", any>} The Supabase client instance.
 */
export default function getClient(): SupabaseClient<any, "public", any> {
  return getSupabaseClient();
}
