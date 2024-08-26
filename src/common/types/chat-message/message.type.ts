import { ValueOf } from "../value-of/valueOf.type";

enum senderRole {
  USER = "user",
  SYSTEM = "system"
}

type Message = {
  _id: string;
  senderRole: ValueOf<senderRole>;
  text: string;
  chatId: string;
  timestamp: string;
}

export { type Message };