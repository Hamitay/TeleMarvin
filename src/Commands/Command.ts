export interface Command {
  execute(groupId: string | undefined) : string;
}
