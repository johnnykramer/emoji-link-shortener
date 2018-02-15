import React, { Component } from 'react';
import { Links } from '../../imports/collections/links';
import moment from 'moment';

class LinkElement extends Component {
  handleDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      Meteor.call('links.remove', this.props.link._id);
    }
  }

  render() {
    const { url, clicks, token, expiry, isExpired } = this.props.link;
    const shortLink = `${Meteor.settings.public.domain}/${token}`;
    return (
      <tr key={token}>
        <td>{url}</td>
        <td>
          <a href={shortLink}>{shortLink}</a>
        </td>
        <td>{clicks}</td>
        <td>{isExpired ? 'EXPIRED' : moment.unix(expiry).format('YYYY-MM-DD H:mm:ss')}</td>
        <td>
          <button onClick={this.handleDelete.bind(this)} className="btn btn-xs btn-danger">⤫</button>
        </td>
      </tr>
    );
  }
}

export default LinkElement;
