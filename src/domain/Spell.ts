export class Spell {
    name: string;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
  level: number;

  constructor(name: string, castingTime: string, range: string, components: string[], duration: string, description: string, level: number ) {
    this.name = name;
    this.castingTime = castingTime;
    this.range = range;
    this.components = components;
    this.duration = duration;
    this.description = description;
    this.level = level;
  }


}  
export const fromJson = (json: any, level: number, name: string): Spell => {
    if (!json.CastingTime || !json.Range || !json.Components || !json.Duration || !json.Description) {
        throw new Error('Invalid spell data. Missing required fields.');
    }
    return new Spell(name, json.CastingTime, json.Range, json.Components, json.Duration, json.Description, level);
  }