import NewsAPI from "newsapi";
import * as dotenv from "dotenv";
dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

newsapi.v2
  .topHeadlines({
    q: "politics",
    category: "politics",
    from: "2023-02-17",
    to: "2023-02-19",
    language: "en",
    country: "us",
    sortBy: "relevancy",
    page: 1,
    pageSize: 6,
  })
  .then((response) => {
    console.log(response);
    /*
    {
      status: "ok",
      articles: [...]
    }
  */
  });
