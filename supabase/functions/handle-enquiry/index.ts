// Supabase Edge Function: handle-enquiry
// Handles puppy adoption inquiries, nursery visits, and gotcha day submissions
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const body = await req.json();
    const { name, phone, email, area, message, puppy_name, puppy_id } = body;

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Name and phone number are required fields." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert into enquiries table
    const { data, error } = await supabaseClient
      .from("enquiries")
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          area: area ? area.trim() : null,
          message: message ? message.trim() : null,
          puppy_name: puppy_name ? puppy_name.trim() : null,
          puppy_id: puppy_id || null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database insertion error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare direct WhatsApp reply link
    const waText = encodeURIComponent(
      `Hello TeddyPups UAE! My name is ${name}. I submitted an enquiry for ${puppy_name || "a puppy"}. Message: ${message || "I would love to learn more!"}`
    );
    const whatsappUrl = `https://wa.me/971541676733?text=${waText}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your enquiry has been received by the TeddyPups nursery team!",
        enquiry: data,
        whatsappUrl,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error in handle-enquiry function:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
