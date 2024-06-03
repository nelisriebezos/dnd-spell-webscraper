import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchPage = async (url: string) => {
    try {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  };