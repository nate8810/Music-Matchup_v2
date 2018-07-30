import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../components/pageHeader';

class Home extends React.Component {

  componentWillMount () {
    let { dispatch } = this.props;
    fetch(
      'api/projects',
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` } }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        let tempProjName = response[0].name;
        let tempProjDesc = response[0].description;
        console.log("ProjResponse:", response);
        dispatch({ type: 'UPDATEPROJNAME', payload: tempProjName });
        dispatch({ type: 'UPADTEPROJDESC', payload: tempProjDesc });
      })
  }

  render() {
    return (
      <div className="container">
        <PageHeader title={this.props.projectName} />
        <p>{this.props.projectDesc}</p>
      </div>
    );
  }
}

const Home2 = () => (
  <div className="container">
    <PageHeader title="Music Matchup" />
    <p>For our project, we decided to create a “music matchup” application that will allow users to keep track of individual artists, and the various bands that they have been associated with. Users would be able to register, and once registered, would be able to add/remove artists and bands, and associate which artists were ever a part of which bands.</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(Home);