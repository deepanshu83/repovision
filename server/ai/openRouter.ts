export async function getAiRepositorySummary(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return 'OpenRouter API key is not configured. Set OPENROUTER_API_KEY in the backend environment to enable AI summaries.';
  }

  const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 300,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    const message = result.error?.message || result.message || 'OpenRouter request failed';
    throw new Error(message);
  }

  return result.choices?.[0]?.message?.content ?? 'OpenRouter returned no summary.';
}
