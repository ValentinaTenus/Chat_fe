import { MessageSenderRole } from "~/common/enums/index";

type CreateNewMessageRequestDto = {
  text: string;
  chatId: string;
  senderRole: MessageSenderRole;
};

export { type CreateNewMessageRequestDto };