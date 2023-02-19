export const getDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const processBatch = async (categories) => {
  const articlesByCategory = await Promise.all(
    categories.map(async (category) => {
      const articles = await getNews(
        category,
        [getDate(), getDate()],
        "popularity",
        10
      );
      return articles;
    })
  );
  Object.keys(articlesByCategory).forEach((category) => {
    Promise.all(
      articlesByCategory[category].map(async (article) => {
        const { title, description, url, urlToImage, publishedAt } = article;
        pb.insert("articles", {
          url,
          title,
          category,
          date: publishedAt,
          image: urlToImage,
          content: await summarize(category),
          image: urlToImage,
        });
      })
    );
  });
};
