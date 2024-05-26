import axios from 'axios';
import * as cheerio from 'cheerio';

// const url = 'http://dnd5e.wikidot.com/spells:cleric';
const url = 'http://dnd5e.wikidot.com/spell:decompose';
const tabs = [
    'wiki-tab-0-0',
    'wiki-tab-0-1',
    'wiki-tab-0-2',
    'wiki-tab-0-3',
    'wiki-tab-0-4',
    'wiki-tab-0-5',
    'wiki-tab-0-6',
    'wiki-tab-0-7',
    'wiki-tab-0-8',
    'wiki-tab-0-9'
]

const fetchPage = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
};

const findHrefInTableRows = (id: string, page: cheerio.Root) => {
    const tableRows = page(`#${id} table tr`);
    tableRows.each((index, row) => {
      const rowData: { [key: string]: string } = {};
      const link = page(row).find('a').attr('href');

      if (link) {
        rowData['link'] = link;
        console.log(`Row ${index} has a link: ${link}`)
      }
    });
  };

const getSpellLogic = async (url: string) => {
    const page = await fetchPage(url);
    if (!page) return;

    const contentDiv = page('#page-content');
    console.log(contentDiv.text());
}

const main = async () => {
    const page = await fetchPage(url);
    if (!page) return;

    const contentDiv = page('#page-content');
    console.log(contentDiv.text());
    
//   const page = await fetchPage(url);
//   if (!page) return;

//   const contentDiv = page('#wiki-tab-0-0');
//   findHrefInTableRows(tabs[0], page)
};

main();
