import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class ArtistMatchups extends React.Component {

  render() {
    let { matchups } = this.props;
    var artistList;

    if(matchups.length > 0){
      artistList = matchups.map((artist, i) => {
        return(
          <li key={i} id={artist.matchId}><ViewMatchup onViewMatchupClick={this.props.clicky} id={artist.artistId} name={artist.firstName + " " + artist.lastName} /></li>
        )
      });
    } else {
      artistList = "No Matchups Found";
    }

    return (
      <div>
        <hr/>
        <h3>Artist Matchups</h3>
        <ul>
          {artistList}
        </ul>
      </div>
    );

  }
}

class ViewMatchup extends React.Component {
  handleClick = () => {
    this.props.onViewMatchupClick(this.props.id);
  }

  render () {
    return (
      <span className="mm-click mm-name" onClick={this.handleClick}>{this.props.name}</span>
    )
  }
}

class BandDetail extends React.Component {

  componentWillMount() {
    let { dispatch } = this.props;
      fetch('/api/artists', {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch({type: 'UPDATE_ARTISTS', payload: response})
      });
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
      })
      .then(
          fetch(`/api/matchups/artists/${this.props.activeId}`, {
              headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
          })
        .then(response => {
          return response.json();
        })
        .then(response => {
          dispatch({ type: 'MATCHUPS', payload: response });
        })
      );
  }

  onEdit = () => {
    console.log("EDIT!");
      this.props.history.push(`/bands/edit/${this.props.activeId}`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
      });
  }

  onViewMatchup = (matchupId) => {
    console.log("MATCHUP!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: matchupId });
      this.props.history.push(`/artists/detail/${matchupId}`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
      });
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="Band Detail" />
        <button className="btn btn-lg btn-primary mm-create" onClick={this.onEdit}>Edit Band</button>
        <hr/>
        <div className="mm-details">
          <p className="mm-name"><span className="mm-label">Band Name:</span> {this.props.bandName}</p>
          <p className="mm-name"><span className="mm-label">Year Formed:</span> {this.props.startYear}</p>
          <p className="mm-name"><span className="mm-label">Year Disbanded:</span> {this.props.endYear}</p>
          <p className="mm-name"><span className="mm-label">Genre:</span> {this.props.genre}</p>
        </div>
        <ArtistMatchups matchups={this.props.matchups} clicky={this.onViewMatchup} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
    bands: state.bands
  }
}

export default connect(mapStateToProps)(BandDetail);