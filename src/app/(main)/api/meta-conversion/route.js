export async function POST(req) {
  const { event_name, event_id, event_time, user_data } = await req.json();

  const accessToken =
    "EEAAXvat5j8awBO9LPRMctZBygzBIIzLcZCX2pKxQ65SEdphZAHy5kqJ1DZA9AsZBbko2BAB1iqGWx8wZCuyjft1j2QVdtW9EDMWKkIpDuH2ByeNydMptochpEakg7opdlAh9Doxc3lJfvixfvL3xDmtTwSULKVH6NCCKlhrcFHPOYgBUmu6uGZCkXdC8LZCN6xe7JgAZDZD"; // Replace with your actual token
  const pixelId = "1147887730461644"; // Replace with your actual Pixel ID

  const eventData = {
    data: [
      {
        event_name,
        event_time: event_time || Math.floor(new Date().getTime() / 1000),
        event_id,
        user_data,
        action_source: "website",
      },
    ],
  };
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }
  );

  const responseData = await response.json();
  return new Response(JSON.stringify(responseData), { status: 200 });
}