import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class BandMatchups extends React.Component {

  render() {
    let { matchups } = this.props;
    var BandList;

    if(matchups.length > 0){
      BandList = matchups.map((band, i) => {
        return(
          <li key={i} id={band.matchId}><ViewMatchup onViewMatchupClick={this.props.clicky} id={band.bandId} name={band.bandname} /></li>
      )
    });
    } else {
      BandList = "No Matchups Found";
    } 
    
    return (
      <div>
        <hr/>
        <h3>Band Matchups</h3>
        <ul>
          {BandList}
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

class ArtistDetail extends React.Component {

  componentWillMount() {
    let { dispatch } = this.props;
      fetch('/api/bands', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch({type: 'MATCHED_BANDS', payload: response})
      });
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

  onEdit = () => {
    console.log("EDIT!");
    this.props.history.push(`/artists/edit/${this.props.activeId}`);
  }

  onViewMatchup = (matchupId) => {
    console.log("MATCHUP!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: matchupId });
    this.props.history.push(`/bands/detail/${matchupId}`);
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="Artist Detail" />
        <button className="btn btn-lg btn-primary mm-create" onClick={this.onEdit}>Edit Artist</button>
        <hr/>
        <div className="mm-details">
          <p className="mm-name"><span className="mm-label">First Name:</span> {this.props.artistFirst}</p>
          <p className="mm-name"><span className="mm-label">Last Name:</span> {this.props.artistLast}</p>
          <p className="mm-name"><span className="mm-label">Stage Name:</span> {this.props.artistStage}</p>
        </div>
        <BandMatchups matchups={this.props.matchups} clicky={this.onViewMatchup} />
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

export default connect(mapStateToProps)(ArtistDetail);