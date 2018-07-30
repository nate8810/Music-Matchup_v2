import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class ArtistCreate extends React.Component {

  onArtistFirstChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'ARTIST_UPDATEFIRST', payload: event.target.value })
  }
  onArtistLastChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'ARTIST_UPDATELAST', payload: event.target.value })
  }
  onArtistStageChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'ARTIST_UPDATESTAGE', payload: event.target.value })
  }

  saveNewArtist = () => {
    let { dispatch } = this.props;
    fetch('/api/artists', {
      method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.props.artistFirst,
        lastName: this.props.artistLast,
        stageName: this.props.artistStage,
      })
    })
    .then( function(response) {
      dispatch({type: 'ARTIST_UPDATEFIRST', payload: '' })
      dispatch({type: 'ARTIST_UPDATELAST', payload: '' })
      dispatch({type: 'ARTIST_UPDATESTAGE', payload: '' })
    })
    .then( function(response) {
        fetch('/api/artists', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
        })
        .then( function(response) {
          return response.json();
        })
        .then( function(response) {
          console.log("Update artist after Artist Create");
          dispatch({ type: 'UPDATE_ARTISTS', payload: response });
          return "complete";
        })
    })
    .then(this.props.history.push('/artists'));
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="New Artist" />
        <button className="btn btn-lg mm-create btn-primary" onClick={this.saveNewArtist}>Save New Artist</button>
        <hr/>
        <form>
          <div className="form-group">
            <label for="firstName">First Name: *</label>
            <input id="firstName" className="form-control" type="text" onChange={this.onArtistFirstChange} />
          </div>
          <div className="form-group">
            <label for="lastName">Last Name: *</label>
            <input id="lastName" className="form-control" type="text" onChange={this.onArtistLastChange} />
          </div>
          <div className="form-group">
            <label for="stageName">Stage Name:</label>
            <input id="stageName" className="form-control" type="text" onChange={this.onArtistStageChange} />
          </div>
        </form>
        <p className="mm-requiredNote">Fields marked with * are required</p>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
    artists: state.artists
  }
}

export default connect(mapStateToProps)(ArtistCreate);