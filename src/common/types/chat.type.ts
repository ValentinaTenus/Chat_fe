import { type Message } from "./message.type"

type Chat = {
  _id: string;
  firstName: string;
  lastName: string;
  messages: Message[]
};

export { type Chat };