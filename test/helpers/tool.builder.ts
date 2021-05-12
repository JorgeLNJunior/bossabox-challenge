import * as faker from 'faker';
import { connect, connection, model } from 'mongoose';

import { Tool, ToolSchema } from '../../src/modules/tool/schemas/tool.schema';

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

  async persist() {
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const Model = model(Tool.name, ToolSchema);
    const tool = await new Model(this.tool).save();

    await connection.close();

    return tool;
  }
}

interface FakeTool {
  title?: string;
  description?: string;
  link?: string;
  tags?: string[];
}
