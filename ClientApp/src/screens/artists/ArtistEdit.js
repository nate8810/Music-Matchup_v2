import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class EditBandMatchups extends React.Component {

  render() {
    let { matchups, bands } = this.props;

    var currentBandsList;
    if(matchups.length > 0) {
      currentBandsList = matchups.map((band, i) => {
        return(
          <DeleteMatchup key={i} onDeleteMatchupClick={this.props.onDeleteFunction} id={band.matchId} name={band.bandname} />
        )
      });
    } else {
      currentBandsList = "No Matchups Found";
    }
    function filterBands (matchedBands, allBands) {
      let filterArray = [];
      matchedBands.forEach(function (match) {
        filterArray.push(match.bandId);
      });
      let newArray = [];
      for(let i=0; i<allBands.length; i++) {
        if(!filterArray.includes(allBands[i].id)) {
          newArray.push(allBands[i]);
        }
      }
      return newArray;
    }

    let availableBands = filterBands(matchups, bands);
    let availableBandsList = availableBands.map((band, i) => {
      return(
        <AddMatchup key={i} onAddMatchupClick={this.props.onAddFunction} id={band.id} name={band.bandname} />
      );
    });

    return (
      <div>
        <hr/>
        <div className="mm-delMatches">
          <h3>Delete Band Matchup</h3>
          {currentBandsList}
        </div>
        <hr/>
        <div className="mm-addMatches">
          <h3>Add New Band Matchup</h3>
          {availableBandsList}
        </div>
      </div>
    );

  }
}

class AddMatchup extends React.Component {
  handleClick = () => {
    this.props.onAddMatchupClick(this.props.id);
  }

  render () {
    return (
      <p><i onClick={this.handleClick} class="mm-click mm-crud mm-add fas fa-plus-square"></i> {this.props.name}</p>
    )
  }
}

class DeleteMatchup extends React.Component {
  handleClick = () => {
    this.props.onDeleteMatchupClick(this.props.id);
  }

  render () {
    return (
      <p><i onClick={this.handleClick} class="mm-click mm-crud mm-delete fas fa-times-circle"></i> {this.props.name}</p>
    )
  }
}

class ArtistEdit extends React.Component {
  
  componentDidMount() {
    let { dispatch } = this.props;
      fetch(`/api/artists/${this.props.activeId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        let tempArtistFirst = response.firstName;
        let tempArtistLast = response.lastName;
        let tempArtistStage = response.stageName;
        dispatch({ type: 'ARTIST_UPDATEFIRST', payload: tempArtistFirst });
        dispatch({ type: 'ARTIST_UPDATELAST', payload: tempArtistLast });
        dispatch({ type: 'ARTIST_UPDATESTAGE', payload: tempArtistStage });
      });
  }

  componentWillMount() {
    let { dispatch } = this.props;
      fetch(`/api/artists/${this.props.activeId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
      })
      .then( function(response) {
        return response.json();
      })
      .then( function(response) {
        let tempArtistFirst = response.firstName;
        let tempArtistLast = response.lastName;
        let tempArtistStage = response.stageName;
        dispatch({ type: 'ARTIST_UPDATEFIRST', payload: tempArtistFirst });
        dispatch({ type: 'ARTIST_UPDATELAST', payload: tempArtistLast });
        dispatch({ type: 'ARTIST_UPDATESTAGE', payload: tempArtistStage });
      })
      .then(
          fetch(`/api/matchups/bands/${this.props.activeId}`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
        .then(response => {
          return response.json();
        })
        .then(response => {
          dispatch({ type: 'MATCHUPS', payload: response });
        })
      );
  }

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

  updateArtist = () => {
    let { dispatch } = this.props;
    let body = JSON.stringify({
      id: this.props.activeId,
      firstName: this.props.artistFirst,
      lastName: this.props.artistLast,
      stageName: this.props.artistStage
    });
    fetch(`/api/artists/${this.props.activeId}`, {
      method: 'PUT',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then( function(response) {
      dispatch({ type: 'ARTIST_UPDATEFIRST', payload: '' });
      dispatch({ type: 'ARTIST_UPDATELAST', payload: '' });
      dispatch({ type: 'ARTIST_UPDATESTAGE', payload: '' });
    })
    .then( function(response) {
        fetch('/api/artists', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
        })
        .then( function(response) {
          return response.json();
        })
        .then( function(response) {
          console.log("Update artists after Artist Edit");
          dispatch({ type: 'UPDATE_ARTISTS', payload: response });
          return "complete";
        })
    })
    .then(this.props.history.push('/artists'));
  }

  onDeleteMatchup = (matchupId) => {
    console.log("DELETE MATCHUP!");
    let { dispatch } = this.props;
      fetch(`/api/matchups/${matchupId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }})
      .then( function(response) {
        console.log("deleting");
        return "a thing";
      })
      .then( response => {
        console.log(response);
          fetch(`/api/matchups/bands/${this.props.activeId}`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
        .then(response => {
          console.log("fetching matchups");
          return response.json();
        })
        .then(response => {
          console.log("updating matchups");
          dispatch({ type: 'MATCHUPS', payload: response });
        })
      });
  }

  onAddMatchup = (bandId) => {
    console.log("ADD MATCHUP!");
    console.log("bandId: ", bandId);
    let { dispatch } = this.props;
    fetch('/api/matchups', {
      method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bandId: bandId,
        artistId: this.props.activeId
      })
    })
      .then( response => {
          fetch(`/api/matchups/bands/${this.props.activeId}`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
        .then(response => {
          return response.json();
        })
        .then(response => {
          dispatch({ type: 'MATCHUPS', payload: response });
        })
      })
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="Update Artist" />
        <button className="btn btn-lg mm-create btn-primary" onClick={this.updateArtist}>Save Changes</button>
        <hr/>
        <form>
          <div className="form-group">
            <label for="firstName">First Name: *</label>
            <input id="firstName" className="form-control" type="text" onChange={this.onArtistFirstChange} value={this.props.artistFirst} />
          </div>
          <div className="form-group">
            <label for="lastName">Last Name: *</label>
            <input id="lastName" className="form-control" type="text" onChange={this.onArtistLastChange} value={this.props.artistLast} />
          </div>
          <div className="form-group">
            <label for="stageName">Stage Name:</label>
            <input id="stageName" className="form-control" type="text" onChange={this.onArtistStageChange} value={this.props.artistStage} />
          </div>
        </form>
        <p className="mm-requiredNote">Fields marked with * are required</p>
        <EditBandMatchups bands={this.props.bands} matchups={this.props.matchups} onDeleteFunction={this.onDeleteMatchup} onAddFunction={this.onAddMatchup} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(ArtistEdit);