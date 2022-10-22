import ClubCollection from '../club/collection';
import type {Request, Response, NextFunction} from 'express';


/**
 * Checks if all the clubs in the discourse exist
 */
 const isValidClubs = async (req: Request, res: Response, next: NextFunction) => {
  const clubs = req.body.clubs;

  clubs.foreach(async (club: string) => {
    const clubData = await ClubCollection.findOneByClubName(club);
    
    if (!clubData) {
      return res.status(400).json({
        message: 'One or more of the clubs you entered does not exist.'
      });
    }
  });

  next();
  return;
}


export {
  isValidClubs
}
