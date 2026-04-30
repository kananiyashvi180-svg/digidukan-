const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY === 'your-anthropic-api-key' ? 'dummy' : process.env.ANTHROPIC_API_KEY,
});

const isMockEnabled = process.env.ANTHROPIC_API_KEY === 'your-anthropic-api-key' || !process.env.ANTHROPIC_API_KEY;

exports.parseShopDetails = async (text) => {
  try {
    if (isMockEnabled) {
      console.log('AI Mocking enabled. Returning sample data...');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        storeName: "Ravi's Organic Store",
        category: "Groceries",
        tagline: "Shuddh aur Swasth",
        products: ["Basmati Rice", "Organic Ghee", "Honey", "Spices"],
        phone: "9876543210",
        address: "Main Market, Village Khera",
        hours: "9 AM - 8 PM",
        color: "#16a34a"
      };
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: "You are an AI assistant for DigiDukan, a platform that helps Indian shopkeepers create digital stores. Your task is to parse the shopkeeper's description (which may be in English, Hindi, or Hinglish) and extract structured JSON data. The JSON must include: storeName, category (e.g., Kirana, Bakery, Mobile Repair), tagline, products (an array of strings), phone, address, hours, and color (a hex code or color name representing the theme). Respond ONLY with the JSON object.",
      messages: [{ role: "user", content: text }],
    });

    const content = response.content[0].text;
    return JSON.parse(content);
  } catch (error) {
    console.error('Claude API Error:', error);
    // Fallback to simpler mock if API fails
    return {
      storeName: "My Digital Shop",
      category: "General Store",
      tagline: "Always at your service",
      products: ["Sample Item 1", "Sample Item 2"],
      phone: "0000000000",
      address: "India",
      hours: "9 AM - 9 PM",
      color: "#3b82f6"
    };
  }
};

