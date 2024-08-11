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
