import {createNodeMiddleware} from "@octokit/webhooks";
import { App } from "octokit";
import { EvaluationItem, EventState } from "../model/evaluation-item";
import appManager from "../controll/app-manager";
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config();

// This assigns the values of your environment variables to local variables.
const appId: any = process.env.APP_ID;
const webhookSecret: any = process.env.WEBHOOK_SECRET;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;


// This reads the contents of your private key file.
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// This creates a new instance of the Octokit App class.
const app = new App({
  appId: appId,
  privateKey: privateKey,
  webhooks: {
    secret: webhookSecret
  },
});


// This adds an event handler that your code will call later. When this event handler is called, it will log the event to the console. Then, it will use GitHub's REST API to add a comment to the pull request that triggered the event.
async function handlePullRequestOpened({octokit, payload}) {
  console.log(`Received a pull request event for #${payload.pull_request.number}`);

  try {

    console.log('Find PullRequest into monitoredList...')
    const pullResquest: EvaluationItem = appManager.contextManager.monitorContextManager
    .findById(payload.pull_request.number) as EvaluationItem

    if(pullResquest){
      console.log('PullRequest has been found...')
      console.log('Preparing to Update...')
      console.log('Updating PullRequest Status...')

      pullResquest.status = EventState.APPROVED
      appManager.contextManager.monitorContextManager.update(pullResquest)

      console.log('PullRequest has been updated!')
    }
    
  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    console.error(error)
  }
};

// This sets up a webhook event listener. When your app receives a webhook event from GitHub with a `X-GitHub-Event` header value of `pull_request` and an `action` payload value of `opened`, it calls the `handlePullRequestOpened` event handler that is defined above.
app.webhooks.on("pull_request.closed", handlePullRequestOpened);

// This logs any errors that occur.
app.webhooks.onError((error) => {
  if (error.name === "AggregateError") {
    console.error(`Error processing request: ${error.event}`);
  } else {
    console.error(error);
  }
});

const port = 3000;
const host = 'localhost';
const path = "/api/webhook";
const localWebhookUrl = `http://${host}:${port}${path}`;


const middleware = createNodeMiddleware(app.webhooks, {path});
export default middleware