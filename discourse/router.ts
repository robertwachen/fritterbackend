import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import DiscourseCollection from './collection';
import * as discourseValidator from './middleware';
import * as util from './util';

const router = express.Router();


/**
 * Create a new discourse.
 * 
 * Note: users will not create clubs, we will create them for them. Thus, we do not check for anything about the user.
 *
 * @name POST /api/discourses
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
    // discourseValidator.isValidClubs,
    discourseValidator.isValidEndDate
  ],
  async (req: Request, res: Response) => {
    const clubsArray = req.body.clubs.split(',');

    clubsArray.forEach((club: string, index: number) => {
      clubsArray[index] = club.trim();
    });

    const endDate = req.body.endDate || new Date().setTime(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now

    const discourse = await DiscourseCollection.addOne(clubsArray, endDate);

    res.status(201).json({
      message: 'Your discourse was created successfully.',
      discourse: util.constructDiscourseResponse(discourse)
    });
  }
);

/**
 * Delete a discourse
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
  '/:discourseId?',
  [
    // userValidator.isUserLoggedIn,
    // clubValidator.isClubOwner,
  ],
  async (req: Request, res: Response) => {
    console.log(req.params);
    await DiscourseCollection.deleteOne(req.params.discourseId);
    res.status(200).json({
      message: 'Your discourse was deleted successfully: ' + req.params.discourseId + '.'
    });
  }
);

/**
 * Modify a discourse
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
  '/:id?',
  [
    // userValidator.isUserLoggedIn,
    // clubValidator.isValidClubName,
    // clubValidator.isExistingClubName,
    // clubValidator.hasClubProps
  ],
  async (req: Request, res: Response) => {
    // console.log(req.body);
    // const club = await DiscourseCollection.updateOne(req.body.discourseId, req.body.endDate, req.body.clubs);
    res.status(200).json({
      message: 'Your discourse was updated successfully.',
      // club: util.constructDiscourseResponse(club)
    });
  }
);

export {router as discourseRouter};
