import { Spell } from "./domain/Spell";

export const getSpellAsJson = (input: string): any => {
  const lines = input.split("\n").map((line) => line.trim());
  const spellDetails: any = {};
  let descriptionLines: string[] = [];
  let isDescription = false;

  lines.forEach((line) => {
    switch (true) {
      case line.startsWith("Casting Time:"):
        spellDetails["CastingTime"] = line.replace("Casting Time:", "").trim();
        break;
      case line.startsWith("Range:"):
        spellDetails["Range"] = line.replace("Range:", "").trim();
        break;
      case line.startsWith("Components:"):
        const components = line.replace("Components:", "").trim();
        spellDetails["Components"] = components
          .split(",")
          .map((component) => component.trim());
        break;
      case line.startsWith("Duration:"):
        spellDetails["Duration"] = line.replace("Duration:", "").trim();
        isDescription = true; // Start collecting description after Duration
        break;
      case line.startsWith("Spell Lists"):
        isDescription = false; // Stop collecting description before Spell Lists
        break;
      default:
        if (isDescription) {
          descriptionLines.push(line);
        }
        break;
    }
  });

  spellDetails["Description"] = descriptionLines.join(" ").trim();
  return spellDetails;
};

export const getClassJson = (input: Spell[], className: string): any => {
  const classJson: any = {
    ClassName: className,
    spells: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    },
  };

  input.forEach((spell) => {
    classJson.spells[spell.level].push({
      Name: spell.name,
      CastingTime: spell.castingTime,
      Range: spell.range,
      Components: spell.components,
      Duration: spell.duration,
      Description: spell.description,
    });
  });
  return classJson;
};
