import NewsAPI from "newsapi";
import * as dotenv from "dotenv";
dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const getNews = (q, dates, sort, size) => {
  newsapi.everything({
      q: q,
      from: dates[0],
      to: dates[1],
      language: "en",
      sortBy: sort,
      page: 1,
      pageSize: size,
    }).then((response) => {
      return response;
    });
};

export default getNews;