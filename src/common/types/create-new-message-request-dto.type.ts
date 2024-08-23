import { MessageSenderRole } from "../enums";

type CreateNewMessageRequestDto = {
  text: string;
  chatId: string;
  senderRole: MessageSenderRole;
};

export { type CreateNewMessageRequestDto };