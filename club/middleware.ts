import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ClubCollection from './collection';

/**
 * Checks if a club name in req.body is valid, that is, it matches the clubName regex
 */
const isValidClubName = (req: Request, res: Response, next: NextFunction) => {
  res.status(409).json({
    error: {
      club: 'test test.'
    }
  });
  
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
}


/**
 * Checks if a club name in req.body is already in use
 */
const isClubNameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const club = await ClubCollection.findOneByClubName(req.body.name);

  res.status(409).json({
    error: {
      club: 'test test.'
    }
  });

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
//  const hasClubProps = (req: Request, res: Response, next: NextFunction) => {
//   if (req.body.accountType === 'verified')
//   {
//     if (!req.body.firstName) {
//       res.status(400).json({
//         error: {
//           birthday: 'Verified users must have a first name.'
//         }
//       });
//       return;
//     }

//     if (!req.body.lastName) {
//       res.status(400).json({
//         error: {
//           birthday: 'Verified users must have a first name.'
//         }
//       });
//       return;
//     }

//     if (!req.body.email) {
//       res.status(400).json({
//         error: {
//           email: 'Verified users must have an email.'
//         }
//       });
//       return;
//     }

//     if (!req.body.phone) {
//       res.status(400).json({
//         error: {
//           phone: 'Verified users must have a phone number.'
//         }
//       });
//       return;
//     }

//     if (!req.body.birthday) {
//       res.status(400).json({
//         error: {
//           birthday: 'Verified users must have a birthday.'
//         }
//       });
//       return;
//     }

//   }
  

//   next();
// };


export {
  isValidClubName,
  isClubNameNotAlreadyInUse,
};
