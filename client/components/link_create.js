import React, { Component } from 'react';
import moment from 'moment';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }

  handleSumbit(e) {
    e.preventDefault();
    const expVal = document.querySelector('input[name="expiry-period"]:checked').value.split(',');
    let expiry = moment().add(+expVal[0], expVal[1]).unix();
    Meteor.call('links.insert', this.refs.link.value, expiry, (error) => { 
      if (error) { 
        this.setState({ error: 'Enter a valid URL. Example: https://google.com' });
      } else {
        this.setState({ error: '' });
        this.refs.link.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <input ref="link" className="form-control" />
            </div>
          </div>
          <div className="col-md-3">
            <div ref="expirydate" className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input type="radio" name="expiry-period" value="1,m" autoComplete="off" defaultChecked /> 1 min
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="expiry-period" value="1,h" autoComplete="off" /> 1 hour
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="expiry-period" value="1,d" autoComplete="off" /> 1 day
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="expiry-period" value="1,w" autoComplete="off" /> 1 week
              </label>
            </div>
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary">Shorten!</button>
          </div>
        </div>
        <div className="text-danger">{this.state.error}</div>
      </form>
    );
  }
}

export default LinkCreate;
