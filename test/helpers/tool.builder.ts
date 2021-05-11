import * as faker from 'faker';

export class TooBuiler {
  private tool: FakeTool = {
    title: faker.lorem.words(2),
    link: faker.internet.url(),
    tags: [faker.lorem.word(4), faker.lorem.word(4)],
  };

  static aTool(): TooBuiler {
    return new TooBuiler();
  }

  withoutTitle() {
    delete this.tool.title;
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
  link?: string;
  tags?: string[];
}
