import { JSDOM } from "jsdom";
import axios from "axios";
import { Readability } from "@mozilla/readability";

async function scrapeArticle(url) {
  const { data } = await axios.get(url);
  // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
  let dom = new JSDOM(data, { url });

  // now pass the DOM document into readability to parse
  let article = new Readability(dom.window.document).parse();

  // Done! The article content is in the textContent property
  return article.textContent;
}

export default scrapeArticle;
