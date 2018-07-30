import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/pageHeader';

class BandCreate extends React.Component {

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

  saveNewBand = () => {
    let { dispatch } = this.props;
    fetch('/api/bands', {
      method: 'POST',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bandname: this.props.bandName,
        startYear: this.props.startYear,
        endYear: this.props.endYear,
        genre: this.props.genre
      })
    })
    .then( function(response) {
      dispatch({type: 'BAND_UPDATENAME', payload: '' })
      dispatch({type: 'BAND_UPDATESTART', payload: '' })
      dispatch({type: 'BAND_UPDATEEND', payload: '' })
      dispatch({type: 'BAND_UPDATEGENRE', payload: '' })
    })
    .then( function(response) {
        fetch('/api/bands', {
            headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
        })
        .then( function(response) {
          return response.json();
        })
        .then( function(response) {
          console.log("Update bands after Band Create");
          dispatch({ type: 'UPDATE_BANDS', payload: response });
          return "complete";
        })
    })
    .then(this.props.history.push('/bands'));
  }

  render() {
    return (
      <div className="container">
        <PageHeader title="New Band" />
        <button className="btn btn-lg btn-primary mm-create" onClick={this.saveNewBand}>Save New Band</button>
        <hr/>
        <form>
          <div className="form-group">
            <label for="bandName">Name: *</label>
            <input id="bandName" className="form-control" type="text" onChange={this.onBandNameChange} />
          </div>
          <div className="form-group">
            <label for="startYear">Year Formed:</label>
            <input id="startYear" className="form-control" type="text" onChange={this.onStartYearChange} />
          </div>
          <div className="form-group">
            <label for="endYear">Year Disbanded:</label>
            <input id="endYear" className="form-control" type="text" onChange={this.onEndYearChange} />
          </div>
          <div className="form-group">
            <label for="genre">Genre:</label>
            <input id="genre" className="form-control" type="text" onChange={this.onGenreChange} />
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
    bands: state.bands
  }
}

export default connect(mapStateToProps)(BandCreate);