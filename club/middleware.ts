import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ClubCollection from './collection';

/**
 * Checks if a club name in req.body is valid, that is, it matches the clubName regex
 */
const isValidClubName = (req: Request, res: Response, next: NextFunction) => {
  
  const clubRegex = /^\w+$/i;
  if (!clubRegex.test(req.body.name)) {
    res.status(400).json({
      error: {
        name: 'Club name must be a nonempty alphanumeric string.'
      }
    });
    return;
  }

  next();
  return;
}

/**
 * Checks if a club name in req.body already exists (for deleting/modifying)
 */
 const isExistingClubName = async (req: Request, res: Response, next: NextFunction) => {
  
  const club = await ClubCollection.findOneByClubName(req.body.name);

  if (!club) {
    res.status(409).json({
      error: {
        club: 'This club does not exist.'
      }
    });
  }

  next();
  return;
}


/**
 * Checks if a club name in req.body is already in use (for creating)
 */
const isClubNameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const club = await ClubCollection.findOneByClubName(req.body.name);

  if (!club) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      club: 'A club with this name already exists.'
    }
  });
};

/**
 * Checks if a club has privacy, do later
 */
 const hasClubProps = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.privacy != 'secret' && req.body.privacy != 'private' && req.body.privacy != 'public')
  {
    res.status(400).json({
      error: {
        privacy: 'Club privacy must be either secret, private, or public.'
      }
    });
    return;
  }
  
  next();
  return;
};

const isClubOwner = async (req: Request, res: Response, next: NextFunction) => {
  const club = await ClubCollection.findOneByClubName(req.body.name);
  if (club) {
    if (club.clubOwner == req.session.userId) {
      next();
      return;
    }
  }

  res.status(403).json({
    error: {
      club: 'You are not the owner of this club.'
    }
  });
};


export {
  isValidClubName,
  isClubNameNotAlreadyInUse,
  hasClubProps,
  isExistingClubName,
  isClubOwner
};
