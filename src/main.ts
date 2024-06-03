import { fetchPage } from './fetches';
import { writeToJsonFile } from './fileWriter';
import { extractSpellDetails } from './filters';


const spellContextFilterWords = ["Source: ", "Casting Time: ", "Range: ", "Components: ", "Duration: "];
const mainWikiUrl = 'http://dnd5e.wikidot.com/';
const clericSpellListUrl = 'http://dnd5e.wikidot.com/spells:cleric';
const exampleSpellUrl = 'http://dnd5e.wikidot.com/spell:decompose';
const spellContentId = '#page-content';
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



const getSpellLogicFromSpell = (id: string, page: cheerio.Root) => {
    const tableRows = page(`#${id} table tr`);
    tableRows.each((index, row) => {
      const rowData: { [key: string]: string } = {};
      const link = page(row).find('a').attr('href');

      if (link) {
        rowData['link'] = link;
        getSpellLogic(mainWikiUrl + link);
      }
    });
  };

const getSpellLogic = async (url: string) => {
    const page = await fetchPage(url);
    if (!page) return "no String";

    const contentDiv = page(spellContentId);
    return contentDiv.text();
}

const main = async () => {
    const page = await fetchPage(clericSpellListUrl);
    if (!page) return;

    const contentDivText = await getSpellLogic(exampleSpellUrl);
    const result = extractSpellDetails(contentDivText);
    writeToJsonFile(result);
  };


// const contentDiv = page('#wiki-tab-0-0');
// getSpellLogicFromSpell(tabs[0], page)







main();
