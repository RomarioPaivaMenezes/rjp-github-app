import { Request, Response } from 'express';
import { EvaluationItem, EventState } from '../../model/evaluation-item';
import appManager from '../../controll/app-manager';
import { validSchema } from './validator';


export async function postMonitorItem(req: Request, res: Response) {
  try {
    const item = req.body
    const valid = validSchema(item)

    if (valid == true) {
      item.status = EventState.EVALUATE_APPROVAL
      handle(item, res);
    } else {
      res.status(200).send(valid);
    }
  } catch (error) {
    console.error(`Process Failed`);
    console.debug(error);
    res.status(500).json({ "message": "Failed to register pull request", "error": error });
  }
}

export async function getMonitorItem(req: Request, res: Response) {

    try {
      const itemId: number = parseInt(req.params.itemId)
      let objectItem = appManager.contextManager.findById(itemId)

      if (objectItem) {
        res.status(200).json(JSON.parse(JSON.stringify(objectItem)));
      } else {
        res.status(200).json({ "message": "The object not found!" });
      }

    } catch (error) {
      console.error(`Process Failed`);
      console.debug(error);
      res.status(500).json({ "message": "Failed processing event", "error": error });
    }
    
}

export async function handle(item: EvaluationItem, res: Response) {
  const isSaved = appManager.contextManager.addNewItem(item)

  if (isSaved) {
    console.info(`${item.status} for ${item.org}/${item.repo}/pull/${item.id} (${item.commit})`);
    res.status(200).json({ "message": "Your submission has been accepted for processing." });
  } else {
    res.status(200).json({ "message": "The object has already been monitoring!" });
  }

}
