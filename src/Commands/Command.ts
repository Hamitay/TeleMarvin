import CommandResponse from './CommandResponse';
export interface Command {
  execute(groupId: string | undefined) : Promise<CommandResponse>;
}
