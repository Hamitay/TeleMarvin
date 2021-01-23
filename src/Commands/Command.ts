export interface Command {
  execute(groupId: string | undefined) : Promise<string>;
}
