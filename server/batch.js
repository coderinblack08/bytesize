import allCategories from "./categories.js";
import summarize from "./gpt3.js";
import getNews from "./news.js";
import scrapeArticle from "./scrape.js";
import pb from "./pb.js";

export const getDate = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const processBatch = async (categories) => {
  const articlesByCategory = {};
  for (const category of categories) {
    const { articles } = await getNews(
      category,
      [getDate(1), getDate()],
      "popularity",
      1
    );
    articlesByCategory[category] = articles;
  }

  console.log(articlesByCategory);

  for (const category of categories) {
    const articles = articlesByCategory[category];
    for (const article of articles) {
      let { title, source, content, url, urlToImage, publishedAt } = article;
      try {
        content = await scrapeArticle(url);
        await pb.collection("articles").create({
          url,
          title,
          category,
          date: publishedAt,
          image: urlToImage,
          content: await summarize(content),
          // content,
          image: urlToImage,
          publisher: source.name,
        });
        console.log(`New article "${title}" from "${category}" category`);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export const summarizeExisting = async () => {
  const articles = await pb.collection("articles").getFullList();
  for (const article of articles) {
    const { id, content } = article;
    try {
      await pb.collection("articles").update(id, {
        summary: await summarize(content),
      });
      console.log(`Updated article "${id}"`);
    } catch (error) {
      console.error(error);
    }
  }
};

processBatch(allCategories);
