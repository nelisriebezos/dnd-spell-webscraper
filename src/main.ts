import { Spell, fromJson } from "./domain/Spell";
import { fetchPage, fetchSpell } from "./fetches";
import { writeToJsonFile } from "./fileWriter";
import { getClassJson, getSpellAsJson } from "./jsonUtils";

const mainWikiUrl = "http://dnd5e.wikidot.com/";
const clericSpellListUrl = "http://dnd5e.wikidot.com/spells:cleric";
const exampleSpellUrl = "http://dnd5e.wikidot.com/spell:decompose";
const tabs = [
  "wiki-tab-0-0",
  "wiki-tab-0-1",
  "wiki-tab-0-2",
  "wiki-tab-0-3",
  "wiki-tab-0-4",
  "wiki-tab-0-5",
  "wiki-tab-0-6",
  "wiki-tab-0-7",
  "wiki-tab-0-8",
  "wiki-tab-0-9",
];

const iterateOverSpellTab = async (tab: string, page: cheerio.Root, level: number): Promise<Spell[]> => {
  const spells: Spell[] = [];
  const tableRows = page(`#${tab} table tr`).toArray();

  for (const row of tableRows) {
    const rowData: { [key: string]: string } = {};
    const name = page(row).find("a").text();
    const link = page(row).find("a").attr("href");

    if (link) {
      rowData["link"] = link;
      const spellInformation = await fetchSpell(mainWikiUrl + link);
      try {
        const spell: Spell = fromJson(getSpellAsJson(spellInformation), level, name);
        spells.push(spell);
        console.log("pushed: " + spell.name + " with level: " + spell.level);
      } catch (error) {
        console.error("Error parsing spell:", error);
      }
      await delay(1000);
    }
  }

  console.log("returning spells with size: " + spells.length);
  return spells;
};

const fetchAllSpellsFromClass = async (page: cheerio.Root, className: string): Promise<Spell[]> => {
  const cantrips: Spell[] = await iterateOverSpellTab(tabs[0], page, 0);
  const firstLevel: Spell[] = await iterateOverSpellTab(tabs[1], page, 1);
  const secondLevel: Spell[] = await iterateOverSpellTab(tabs[2], page, 2);
  const thirdLevel: Spell[] = await iterateOverSpellTab(tabs[3], page, 3);
  const fourthLevel: Spell[] = await iterateOverSpellTab(tabs[4], page, 4);
  const fifthLevel: Spell[] = await iterateOverSpellTab(tabs[5], page, 5);
  const sixthLevel: Spell[] = await iterateOverSpellTab(tabs[6], page, 6);
  const seventhLevel: Spell[] = await iterateOverSpellTab(tabs[7], page, 7);
  const eighthLevel: Spell[] = await iterateOverSpellTab(tabs[8], page, 8);
  const ninthLevel: Spell[] = await iterateOverSpellTab(tabs[9], page, 9);

  return [
    ...cantrips,
    ...firstLevel,
    ...secondLevel,
    ...thirdLevel,
    ...fourthLevel,
    ...fifthLevel,
    ...sixthLevel,
    ...seventhLevel,
    ...eighthLevel,
    ...ninthLevel,
  ];
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const main = async () => {
  const className = "Cleric";
  const page = await fetchPage(clericSpellListUrl);
  if (!page) {
    console.error("Failed to fetch page");
    return;
  }

  fetchAllSpellsFromClass(page, className).then((spells) => {
    const classJson = getClassJson(spells, className);
    writeToJsonFile(classJson, className);
  })
  .catch((error) => {
    console.error("Error fetching cantrips:", error);
  });


};

main();
