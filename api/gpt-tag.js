export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '[No reply]';

    res.status(200).json({ reply: text });

  } catch (err) {
    console.error("GPT Error:", err);
    res.status(500).json({ error: 'AI invocation failed' });
  }
}
