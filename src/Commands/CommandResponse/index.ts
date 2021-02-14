import { Context } from 'telegraf';

export default interface CommandResponse {
  respond(botContext: Context): Promise<void>
}
