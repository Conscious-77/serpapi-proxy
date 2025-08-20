// 文件路径: /api/search.js

// 引入正确的Node.js库
import { getJson } from "serpapi";

// 将函数声明为 async 异步函数
export default async function handler(request, response) {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "SerpApi API Key未在环境变量中设置。" });
  }

  const query = request.query.query;
  const engine = request.query.engine || 'google'; 

  if (!query) {
    return response.status(400).json({ error: "缺少'query'参数。" });
  }

  const params = {
    q: query,
    engine: engine,
    api_key: apiKey,
  };

  try {
    // 使用 await 等待异步搜索结果
    const json = await getJson(params);
    // 成功后，将结果返回
    return response.status(200).json(json);
  } catch (error) {
    // 如果搜索过程出错，捕获并返回错误信息
    return response.status(500).json({ error: `调用SerpApi时出错: ${error.message}` });
  }
}
