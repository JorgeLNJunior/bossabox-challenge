import * as faker from 'faker';

export class TooBuiler {
  private tool: FakeTool = {
    title: faker.lorem.words(2),
    link: faker.internet.url(),
    description: faker.lorem.words(4),
    tags: [faker.lorem.word(4), faker.lorem.word(4)],
  };

  static aTool(): TooBuiler {
    return new TooBuiler();
  }

  withoutTitle() {
    delete this.tool.title;
    return this;
  }

  withoutDescription() {
    delete this.tool.description;
    return this;
  }

  withoutLink() {
    delete this.tool.link;
    return this;
  }

  withoutTags() {
    delete this.tool.tags;
    return this;
  }

  build(): FakeTool {
    return this.tool;
  }
}

interface FakeTool {
  title?: string;
  description?: string;
  link?: string;
  tags?: string[];
}
