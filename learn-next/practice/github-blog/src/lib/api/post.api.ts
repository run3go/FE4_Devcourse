import { createClient } from "../supabase/server";

export const fetchPosts = async (q = "") => {
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from("posts")
      .select(
        `
            *,
            profiles (
                id,
                username,
                avatar_url
                )
                `
      )
      .ilike("title", `%${q}%`);

    return posts;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPostDetail = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data: postDetail } = await supabase
      .from("posts")
      .select(
        `
          *,
          profiles (
              id,
              username,
              avatar_url
              ),
          comments (
            id,
            comment,
            profile_id,
            created_at,
            post_id,
            profiles (
              id,
              username,
              avatar_url
            )
          )
        `
      )
      .eq("id", Number(id))
      .single();

    return postDetail;
  } catch (err) {
    console.error(err);
  }
};
