export class Sections {
    static fromJsonList(array): Sections[] {
        return array.map(Sections.fromArray);
    }

    static fromArray({$key, sectionHolder, sectionName}): Sections {
        return new Sections($key, sectionHolder, sectionName);
    }

    constructor(
        public $key: string,
        public sectionHolder: string,
        public sectionName: string,
    ) {}
}