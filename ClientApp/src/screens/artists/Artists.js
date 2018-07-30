import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/pageHeader';

class ItemDelete extends React.Component {
  handleClick = () => {
    this.props.onDeleteClick(this.props.id);
  }

  render () {
    return (
      <td className="mm-crud mm-delete mm-click"><p><i onClick={this.handleClick} class="fas fa-times-circle"></i></p></td>
    )
  }
}

class ItemEdit extends React.Component {
  handleClick = () => {
    this.props.onEditClick(this.props.id);
  }

  render () {
    return (
      <td className="mm-crud mm-edit mm-click"><p><i onClick={this.handleClick} className="fas fa-edit"></i></p></td>
    )
  }
}

class ItemDetail extends React.Component {
  handleClick = () => {
    this.props.onDetailClick(this.props.id);
  }

  render () {
    return (
      <td><p className="mm-name mm-click" onClick={this.handleClick}>{this.props.name}</p></td>
    )
  }
}

class Artists extends React.Component {
  
  componentDidMount() {
    let { dispatch } = this.props;
      fetch('/api/artists', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
      })
          .then(function (response) {
              if (response.status >= 200 && response.status < 300) {
                  return response
              }
              else if (response.status === 401) {
                  localStorage.clear();
                  return;
              }
          })
          .then(response => {
              if (response) {
                  return response.json();
              }
              return;
      })
          .then(response => {
              if (response) {
                  dispatch({ type: 'UPDATE_ARTISTS', payload: response })
              }
              return;
      });
      fetch('/api/bands', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
      })
          .then(function (response) {
              if (response.status >= 200 && response.status < 300) {
                  return response
              }
              else if (response.status === 401) {
                  localStorage.clear();
                  return;
              }
          })
          .then(response => {
              if (response) {
                  return response.json();
              }
              return;
      })
          .then(response => {
              if (response) {
                  dispatch({ type: 'UPDATE_BANDS', payload: response })
              }
              return;
      });
  }

  newArtist = () => {
    this.props.history.push('/artists/new')
  }

  onDelete = (deleteId) => {
    console.log("DELETE2");
    let { dispatch } = this.props;
      fetch(`/api/artists/${deleteId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }})
      .then( function(response) {
        console.log("fetch1");
        return "something done";
      })
      .then( function(response) {
          fetch('/api/artists', {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
          .then( function(response) {
            console.log("fetch2");
            return response.json();
          })
          .then( function(response) {
            console.log("fetch3");
            dispatch({ type: 'UPDATE_ARTISTS', payload: response });
            return "complete";
          })
      })
  }

  onEdit = (editId) => {
    console.log("EDIT!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: editId });
    this.props.history.push(`/artists/edit/${editId}`);
  }

  onDetail = (detailId) => {
    console.log("DETAIL!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: detailId });
    this.props.history.push(`/artists/detail/${detailId}`);
    }

    render() {
        if ('auth_token' in localStorage) {
            return <div>
                {this.renderArtists()}
            </div>;
        }
        else {
            alert("You must be logged in to view")
            localStorage.clear();
            this.props.history.push('/login')
            return null
            //<Redirect to='/' />
        }
    }

  renderArtists() {
    let { artists } = this.props
    // console.log(artists);
    let artistList = artists.map((artist, i) => {
      return(
        <tr key={i} id={artist.id}>
          <ItemEdit id={artist.id} onEditClick={this.onEdit} />
          <ItemDelete id={artist.id} onDeleteClick={this.onDelete} />
          <ItemDetail id={artist.id} onDetailClick={this.onDetail} name={artist.firstName + " " + artist.lastName} />
          <td className="mm-detail">{artist.stageName}</td>
        </tr>)
    });
    return (
      <div className="container">
        <PageHeader title="Artists" />
        <button className="btn btn-lg mm-create btn-primary" onClick={this.newArtist}>Add Artist</button>
        <hr/>
        <table className="mm">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Legal Name</th>
              <th>Stage Name</th>
            </tr>
          </thead>
          <tbody>
            {artistList}
          </tbody>
        </table>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
    artists: state.artists,
  }
}

export default connect(mapStateToProps)(Artists);