import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';


// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
/*
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};
*/

const XINGUE_COMMAND = {
  name: 'xingue',
  description: 'Libere a raiva dentro de você',
  type: 1,
}

const COT_COMMAND = {
  name: 'cot',
  description: 'Mostra a cotação do real em alguma moedas',
  type: 1
}

const NEWS_COMMAND = {
  name: 'news',
  description: 'Mostra as ultimas noticias do g1',
  type: 1
}

const NEWS2_COMMAND = {
  name: 'news2',
  description: 'Mostra as ultimas noticias do the news',
  type: 1
}

const CHOOSE_COMMAND = {
  name: 'choose',
  description: 'Deixe o bot decidir por vc',
  options: [
    {
      type: 3,
      name: 'frase',
      description: 'Faça suas escolhas usando virgula ou espaço',
      required: true,
    },
  ],
}

const ALL_COMMANDS = [TEST_COMMAND, XINGUE_COMMAND, COT_COMMAND, NEWS_COMMAND,  NEWS2_COMMAND,CHOOSE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);