
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY='AIzaSyCI6gpCDcJGndtpuXC-8q69m9FqVVrn8h0';
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

export async function sendMsgToopenAI(message) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = message;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

