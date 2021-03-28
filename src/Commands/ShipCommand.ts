import axios from 'axios';
import cheerio from 'cheerio';

import { Command } from './Command';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';

const isStuckWebsite = 'https://istheshipstillstuck.com/';
const selectorQuery = 'p.Home_description__17Z4F';

const STUCK_MESSAGE = 'YES!';
const NOT_STUCK_MESSAGE = 'NO!';

export default class ShipCommand implements Command {
  async execute(): Promise<CommandResponse> {
    const { data } = await axios.get(isStuckWebsite);
    const $ = await cheerio.load(data);
    const selector = $(selectorQuery);


    const message = selector.text() === 'Yes.' ? STUCK_MESSAGE : NOT_STUCK_MESSAGE;

    return new MessageResponse(`<b>${message}</b> <b>${message}</b> <b>${message}</b> \n According to this site ${isStuckWebsite}`);
  }

}
