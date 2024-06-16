import axios from 'axios';
import * as cheerio from 'cheerio';

const spellContentId = '#page-content';

export const fetchPage = async (url: string) => {
    try {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  };

export const fetchSpell = async (url: string) => {
  const page = await fetchPage(url);
  if (!page) return "no String";

  const contentDiv = page(spellContentId);
  return contentDiv.text();
}