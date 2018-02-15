import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';
import LinkElement from './link_element';

class LinkList extends Component {
  renderRows() {
    return this.props.links.map(link => {
      return (
        <LinkElement key={link._id} link={link} />
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('links');
  return { links: Links.find({}).fetch() };
})(LinkList);
