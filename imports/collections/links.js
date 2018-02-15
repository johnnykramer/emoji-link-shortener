import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';
import randomEmoji from 'random-unicode-emoji';


Meteor.methods({ 
  'links.insert': (url, expiry) => { 
    check(url, Match.Where(url => validUrl.isUri(url)));
    // const token = Math.random().toString(36).slice(-5);
    const token = randomEmoji.random({count: 3}).join('');
    Links.insert({ url, token, expiry, clicks: 0, isExpired: false });
  },

  'links.remove': (_id) => {
    check(_id, String);
    Links.remove({ _id });
  }
});

export const Links = new Mongo.Collection('links');
