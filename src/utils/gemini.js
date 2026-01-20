export const callGeminiAPI = async (prompt, systemInstruction = "") => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("Gemini API Key missing in .env");
        return "Error: API Key no configurada. Por favor configura VITE_GEMINI_API_KEY en tu archivo .env";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    const backoff = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('API Error: ' + response.statusText);
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta.";
        } catch (error) {
            console.error("Gemini API attempt failed", error);
            if (i === 2) return "Error de conexión con la IA. Intenta más tarde.";
            await backoff(Math.pow(2, i) * 1000);
        }
    }
};
