import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { People } from '../people/people';
import { Communities } from '../communities/communities';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // Publish the Communities collection
  Meteor.publish('communities', () => Communities.find());

  // Publish the People collection
  Meteor.publish('people', (communityId) => People.find({ communityId }));
});

Meteor.methods({
  async 'people.checkIn'(personId, checkInDate) {
    try {
      await People.updateAsync(personId, {
        $set: { checkInDate, checkOutDate: null },
      });
    } catch (error) {
      throw new Meteor.Error('checkIn-failed', 'Failed to check in person');
    }
  },
  async 'people.checkOut'(personId) {
    try {
      await People.updateAsync(personId, {
        $set: { checkOutDate: new Date() },
      });
    } catch (error) {
      throw new Meteor.Error('checkOut-failed', 'Failed to check out person');
    }
  },
});
