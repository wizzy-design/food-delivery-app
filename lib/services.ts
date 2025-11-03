import * as ImagePicker from "expo-image-picker";
import { supabase } from "./supabase";

export const signUp = async (
  email: string,
  password: string,
  name: string,
  phone?: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: { data: { name } },
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const uploadProfilePic = async (userId: string) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) return;

  const image = result.assets[0];
  const fileExt = image.uri.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // Convert image to blob
  const formData = new FormData();
  formData.append("file", {
    uri: image.uri,
    name: fileName,
    type: `image/${fileExt}`,
  } as any);

  // Upload to supabase storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, formData, { upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL (if bucket is public)
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

  // Update user metadata too
  const { error: metadataError } = await supabase.auth.updateUser({
    data: { avatar_url: publicUrl },
  });
  if (metadataError) throw metadataError;

  // Update OR Insert into profiles
  const { data: exisitingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .single();

  if (exisitingProfile) {
    // Update user profile with the image URL
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

    if (updateError) throw updateError;
  } else {
    // Insert new profile if missing
    const { error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: userId, avatar_url: publicUrl }]);

    if (insertError) throw insertError;
  }

  return publicUrl;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
