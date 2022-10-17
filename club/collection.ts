import type {HydratedDocument, Types} from 'mongoose';
import type {Club} from './model';
import ClubModel from './model';

/**
 * This file contains a class with functionality to interact with clubs stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Club> is the output of the ClubModel() constructor,
 * and contains all the information in Club. https://mongoosejs.com/docs/typescript.html
 */
class ClubCollection {
  /**
   * Add a new club
   *
   * fix documentation later
   * @return {Promise<HydratedDocument<Club>>} - The newly created club
   */
  static async addOne(name: string, privacy: string, clubRules: string, members: Array<Types.ObjectId>, pendingMembers: Array<Types.ObjectId>, dateCreated: Date): Promise<HydratedDocument<Club>> {
    const club = new ClubModel({name, privacy, clubRules, members, pendingMembers, dateCreated});
    await club.save(); // Saves club to MongoDB
    return club;
  }

  /**
   * Find a club by clubId.
   *
   * @param {string} clubId - The clubId of the club to find
   * @return {Promise<HydratedDocument<Club>> | Promise<null>} - The club with the given club, if any
   */
  static async findOneByClubId(clubId: Types.ObjectId | string): Promise<HydratedDocument<Club>> {
    return ClubModel.findOne({_id: clubId});
  }

  /**
   * Update club's information
   *
   * @param {string} clubId - The clubId of the club to update
   * @param {Object} clubDetails - An object with the club's updated credentials
   * @return {Promise<HydratedDocument<Club>>} - The updated club
   */
  static async updateOne(clubId: Types.ObjectId | string, clubDetails: any): Promise<HydratedDocument<Club>> {
    const club = await ClubModel.findOne({_id: clubId});
    if (clubDetails.name) {
      club.name = clubDetails.name as string;
    }

    if (clubDetails.privacy) {
      club.privacy = clubDetails.privacy as string;
    }

    if (clubDetails.clubRules) {
      club.clubRules = clubDetails.clubRules as string;
    }

    if (clubDetails.members) {
      club.members = clubDetails.members as Array<Types.ObjectId>;
    }

    if (clubDetails.pendingMembers) {
      club.pendingMembers = clubDetails.pendingMembers as Array<Types.ObjectId>;
    }

    if (clubDetails.dateCreated) {
      club.dateCreated = clubDetails.dateCreated as Date;
    }


    await club.save();
    return club;
  }

  /**
   * Delete a club from the collection.
   *
   * @param {string} clubId - The clubId of club to delete
   * @return {Promise<Boolean>} - true if the club has been deleted, false otherwise
   */
  static async deleteOne(clubId: Types.ObjectId | string): Promise<boolean> {
    const club = await ClubModel.deleteOne({_id: clubId});
    return club !== null;
  }
}

export default ClubCollection;
