import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ClubCollection from './collection';
import * as userValidator from '../user/middleware';
import * as clubValidator from '../club/middleware';
import * as util from './util';

const router = express.Router();


/**
 * Create a new club.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 * 
 * UPDATE THIS ^^
 * 
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    clubValidator.isClubNameNotAlreadyInUse,
    clubValidator.isValidClubName,
  ],
  async (req: Request, res: Response) => {
    const club = await ClubCollection.addOne(req.body.name, req.body.privacy, req.body.clubRules, req.body.members, req.body.pendingMembers, req.body.dateCreated);

    res.status(201).json({
      message: 'Your club was created successfully.',
      club: util.constructClubResponse(club)
    });
  }
);

/**
 * Delete a club
 *
 * @name DELETE /api/clubs/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 * 
 * ^^ UPDATE
 */
router.delete(
  '/:clubId?',
  [
    userValidator.isUserLoggedIn,
    clubValidator.isValidClubName,
    clubValidator.isClubNameNotAlreadyInUse
  ],
  async (req: Request, res: Response) => {
    await ClubCollection.deleteOne(req.params.clubId);
    res.status(200).json({
      message: 'Your club was deleted successfully.'
    });
  }
);

/**
 * Modify a club
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 * 
 * UPDATE THOSE ^^
 */
router.put(
  '/:clubId?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const club = await ClubCollection.updateOne(req.params.clubId, req.body.clubDetails);
    res.status(200).json({
      message: 'Your club was updated successfully.',
      club: util.constructClubResponse(club)
    });
  }
);

export {router as clubRouter};
