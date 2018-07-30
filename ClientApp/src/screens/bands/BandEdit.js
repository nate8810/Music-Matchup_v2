import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class EditArtistMatchups extends React.Component {

  render() {
    let { matchups, artists } = this.props;

    var currentArtistList;
    if(matchups.length > 0) {
      currentArtistList = matchups.map((artist, i) => {
        return(
          <DeleteMatchup key={i} onDeleteMatchupClick={this.props.onDeleteFunction} id={artist.matchId} name={artist.firstName + " " + artist.lastName} />
        )
      });
    } else {
      currentArtistList = "No Matchups Found";
    }

    function filterArtists (matchedArtists, allArtists) {
      let filterArray = [];
      matchedArtists.forEach(function (match) {
        filterArray.push(match.artistId);
      });
      let newArray = [];
      for(let i=0; i<allArtists.length; i++) {
        if(!filterArray.includes(allArtists[i].id)) {
          newArray.push(allArtists[i]);
        }
      }
      return newArray;
    }

    let availableArtist = filterArtists(matchups, artists);
    let availableArtistList = availableArtist.map((artist, i) => {
      return(
        <AddMatchup key={i} onAddMatchupClick={this.props.onAddFunction} id={artist.id} name={artist.firstName + " " + artist.lastName} />
      );
    });

    return (
      <div>
        <hr/>
        <div className="mm-delMatches">
          <h3>Delete Artist Matchup</h3>
          {currentArtistList}
        </div>
        <hr/>
        <div className="mm-addMatches">
          <h3>Add New Artist Matchup</h3>
          {availableArtistList}
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

class BandEdit extends React.Component {
  
  componentDidMount() {
    let { dispatch } = this.props;
      fetch(`/api/bands/${this.props.activeId}`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        let tempBandName = response.bandname;
        let tempStartYear = response.startYear;
        let tempEndYear = response.endYear;
        let tempGenre = response.genre;
        dispatch({ type: 'BAND_UPDATENAME', payload: tempBandName });
        dispatch({ type: 'BAND_UPDATESTART', payload: tempStartYear });
        dispatch({ type: 'BAND_UPDATEEND', payload: tempEndYear });
        dispatch({ type: 'BAND_UPDATEGENRE', payload: tempGenre });
      });
  }

  componentWillMount() {
    let { dispatch } = this.props;
      fetch(`/api/bands/${this.props.activeId}`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
      })
      .then( function(response) {
        return response.json();
      })
      .then( function(response) {
        let tempBandName = response.bandname;
        let tempStartYear = response.startYear;
        let tempEndYear = response.endYear;
        let tempGenre = response.genre;
        dispatch({ type: 'BAND_UPDATENAME', payload: tempBandName });
        dispatch({ type: 'BAND_UPDATESTART', payload: tempStartYear });
        dispatch({ type: 'BAND_UPDATEEND', payload: tempEndYear });
        dispatch({ type: 'BAND_UPDATEGENRE', payload: tempGenre });
      })
      .then(
          fetch(`/api/matchups/artists/${this.props.activeId}`, {
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

  onBandNameChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'BAND_UPDATENAME', payload: event.target.value })
  }
  onStartYearChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'BAND_UPDATESTART', payload: event.target.value })
  }
  onEndYearChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'BAND_UPDATEEND', payload: event.target.value })
  }
  onGenreChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'BAND_UPDATEGENRE', payload: event.target.value })
  }

  updateBand = () => {
    let { dispatch } = this.props;
    let body = JSON.stringify({
      id: this.props.activeId,
      bandname: this.props.bandName,
      startYear: parseInt(this.props.startYear),
      endYear: parseInt(this.props.endYear),
      genre: this.props.genre});
    fetch(`/api/bands/${this.props.activeId}`, {
      method: 'PUT',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then( function(response) {
      dispatch({type: 'BAND_UPDATENAME', payload: '' })
      dispatch({type: 'BAND_UPDATESTART', payload: '' })
      dispatch({type: 'BAND_UPDATEEND', payload: '' })
      dispatch({type: 'BAND_UPDATEGENRE', payload: '' })
    })
    .then( function(response) {
        fetch('/api/bands', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
        })
        .then( function(response) {
          return response.json();
        })
        .then( function(response) {
          console.log("Update bands after Band Edit");
          dispatch({ type: 'UPDATE_BANDS', payload: response });
          return "complete";
        })
    })
    .then(this.props.history.push('/bands'));
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
          fetch(`/api/matchups/artists/${this.props.activeId}`, {
              headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
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

  onAddMatchup = (artistId) => {
    console.log("ADD MATCHUP!");
    console.log("artistId: ", artistId);
    let { dispatch } = this.props;
    fetch('/api/matchups', {
      method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bandId: this.props.activeId,
        artistId: artistId
      })
    })
      .then( response => {
          fetch(`/api/matchups/artists/${this.props.activeId}`, {
              headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
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
        <PageHeader title="Update Band" />
        <button className="btn btn-lg btn-primary mm-create" onClick={this.updateBand}>Save Changes</button>
        <hr/>
        <form>
          <div className="form-group">
            <label for="bandName">Name: *</label>
            <input id="bandName" className="form-control" type="text" onChange={this.onBandNameChange} value={this.props.bandName} />
          </div>
          <div className="form-group">
            <label for="starYear">Year Formed:</label>
            <input id="starYear" className="form-control" type="text" onChange={this.onStartYearChange} value={this.props.startYear} />
          </div>
          <div className="form-group">
            <label for="endYear">Year Disbanded:</label>
            <input id="endYear" className="form-control" type="text" onChange={this.onEndYearChange} value={this.props.endYear} />
          </div>
          <div className="form-group">
            <label for="genre">Genre:</label>
            <input id="genre" className="form-control" type="text" onChange={this.onGenreChange} value={this.props.genre} />
          </div>
        </form>
        <p className="mm-requiredNote">Fields marked with * are required</p>
        <EditArtistMatchups artists={this.props.artists} matchups={this.props.matchups} onDeleteFunction={this.onDeleteMatchup} onAddFunction={this.onAddMatchup} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(BandEdit);