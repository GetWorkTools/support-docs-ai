import first from "lodash/first";
import isEmpty from "lodash/isEmpty";
import getClient from "../../client";
import { type PostgrestError } from "@supabase/supabase-js";
import { type UserParams } from "..";

/**
 * Saves a user to the Supabase database.
 *
 * @param {UserParams} user - The user object containing email and name properties.
 * @returns {Promise<{ userDetail?: any, error?: PostgrestError }>} A promise that resolves with the user detail object.
 */
export const saveUserToSupabase = async (
  user: UserParams
): Promise<{ userDetail?: any; error?: PostgrestError }> => {
  const supabaseClient = getClient();

  const { data: userDetail, error: selectError } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", user.email);

  if (selectError) {
    return { error: selectError };
  }

  if (isEmpty(userDetail)) {
    const { data: insertedUserDetail, error: insertError } =
      await supabaseClient
        .from("users")
        .insert({ email: user.email, name: user.name });

    if (insertError) {
      return { error: insertError };
    }

    return { userDetail: first(insertedUserDetail) };
  }

  return { userDetail: first(userDetail) };
};

/**
 * Retrieves a user from the Supabase database by email.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<{ userDetail?: any, error?: PostgrestError }>} A promise that resolves with the user detail object or an error object.
 */
export const getUserFromSupabase = async (
  email: string
): Promise<{ userDetail?: any; error?: PostgrestError }> => {
  const supabaseClient = getClient();

  const { data: userDetail, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    return { error };
  }

  return { userDetail: first(userDetail) };
};
