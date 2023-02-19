import NewsAPI from "newsapi";
import * as dotenv from "dotenv";
dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const getNews = async (q, dates, sort, size) => {
  return newsapi.v2.everything({
    q: q,
    from: dates[0],
    to: dates[1],
    language: "en",
    sortBy: sort,
    page: 1,
    pageSize: size,
  });
};

export default getNews;
