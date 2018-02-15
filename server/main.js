import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';
import moment from 'moment';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

function onRoute(req, res, next) {
  const link = Links.findOne({ token: req.params.token });
  if (link) {
    if (moment().unix() > moment.unix(link.expiry).unix()) {
      Links.update(link, { $set: { isExpired: true } });
      res.writeHead(307, { 'Location': Meteor.settings.public.expiredLink });
      return res.end();
    }
    Links.update(link, { $inc: { clicks: 1 } });
    res.writeHead(307, { 'Location': link.url });
    return res.end();
  } else {
    res.writeHead(307, { 'Location': Meteor.settings.public.expiredLink });
    return res.end();
  }
}

const middleware = ConnectRoute((router) => {
  router.get('/:token', onRoute)
});

WebApp.connectHandlers.use(middleware);