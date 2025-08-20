// 文件路径: /api/search.js

const { getJson } = require("google-search-results");

// 这是Vercel的Serverless Function固定格式
export default function handler(request, response) {
  // 从环境变量中安全地读取你的SerpApi Key
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "SerpApi API Key未在环境变量中设置。" });
  }

  // 从前端请求的URL中获取搜索参数
  // 例如: /api/search?query=你好&engine=google
  const query = request.query.query;
  const engine = request.query.engine || 'google'; // 如果不指定，默认为google

  if (!query) {
    return response.status(400).json({ error: "缺少'query'参数。" });
  }

  // 构造SerpApi的请求参数
  const params = {
    q: query,
    engine: engine,
    api_key: apiKey,
  };

  // 调用SerpApi库发起搜索，并设置回调函数
  getJson(params, (json) => {
    // 收到SerpApi的结果后，将其作为响应返回给前端
    return response.status(200).json(json);
  });
}