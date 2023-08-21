import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";
import { getOneCopy } from "./copy-pasta.js"
import { getExchangeRates } from "./exchange.js"
import { getNewsFromG1 } from './news.js'
import { getNewsFromTN } from './news.js'
import { reCall } from './re-call.js'
import choose from './choose.js'

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
//const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.get('/', (req, res)=>{
  return res.sendStatus(201)
})
app.get('/recall', (req,res)=>{
  return res.sendStatus(202)
})

app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  const idInterval_obj = []
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    
    if(name === 'xingue'){
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: getOneCopy()
        }
      })
    }
    
    if(name === 'cot'){
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: await getExchangeRates()
        }
      })
    }
    
    if(name === 'news'){
      const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}`;
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'espere...'
        },
      });
      
      await DiscordRequest(endpoint, {
            method: 'POST',
            body: {
              content: await getNewsFromG1()
            },
      })
    }
    if(name === 'news2'){
      //const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}`;
      //endpoint to create new followup message
      const msg = await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'espere...'
        },
      });
      
      const endpoint = `/webhooks/${process.env.APP_ID}/${req.body.token}/messages/@original`
      await DiscordRequest(endpoint, {
            method: 'PATCH',
            body: {
              content: await getNewsFromTN()
            },
      })
    }
    
    if (name == 'choose'){
      const str = req.body.data.options[0].value
      const choosed = choose(str)
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Entre ${str}\nFoi escolhido o: **${choosed}**`
        },
      });
    }
    
    // "test" command
    if (name === "test") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "hello world " + getRandomEmoji(),
        },
      });
    }
  }
});

reCall()

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
