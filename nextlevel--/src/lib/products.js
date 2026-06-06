import { supabase } from "./supabase";

// ─── READ ────────────────────────────────────────────────────
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// ─── CREATE ──────────────────────────────────────────────────
export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── UPDATE ──────────────────────────────────────────────────
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── DELETE ──────────────────────────────────────────────────
export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ─── IMAGE UPLOAD ────────────────────────────────────────────
// Bucket name: "product-images" — create it in Supabase Storage
// and set it to PUBLIC so images load on the storefront.
export async function uploadProductImage(file) {
  const ext      = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteProductImage(url) {
  // Extract filename from full public URL
  const parts    = url.split("/product-images/");
  if (parts.length < 2) return;
  const fileName = parts[1];

  const { error } = await supabase.storage
    .from("product-images")
    .remove([fileName]);

  if (error) console.warn("Image delete failed:", error.message);
}
