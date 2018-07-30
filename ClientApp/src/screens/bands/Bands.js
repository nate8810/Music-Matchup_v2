import React from 'react';
import { connect } from 'react-redux';

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

class Bands extends React.Component {
  
  componentDidMount() {
    let { dispatch } = this.props;
      fetch('/api/bands', {
          headers: {'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,}
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
      fetch('/api/artists', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
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
  }

  newBand = () => {
    this.props.history.push('/bands/new')
  }

  onDelete = (deleteId) => {
    console.log("DELETE");
    let { dispatch } = this.props;
      fetch(`/api/bands/${deleteId}`,
          {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
      .then( function(response) {
        console.log("fetch1");
        return "something done";
      })
      .then( function(response) {
          fetch('/api/bands', {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, }
          })
          .then( function(response) {
            console.log("fetch2");
            return response.json();
          })
          .then( function(response) {
            console.log("fetch3");
            dispatch({ type: 'UPDATE_BANDS', payload: response });
            return "complete";
          })
      })
  }

  onEdit = (editId) => {
    console.log("EDIT!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: editId });
    this.props.history.push(`/bands/edit/${editId}`);
  }

  onDetail = (detailId) => {
    console.log("DETAIL!");
    let { dispatch } = this.props;
    dispatch({ type: 'UPDATE_ACTIVE_ID', payload: detailId });
    this.props.history.push(`/bands/detail/${detailId}`);
  }

    render() {
        if ('auth_token' in localStorage) {
            return <div>
                {this.renderBands()}
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

  renderBands() {
    let { bands } = this.props
    // console.log(bands);
    let bandList = bands.map((band, i) => {
      return(
        <tr key={i} id={band.id}>
          <ItemEdit id={band.id} onEditClick={this.onEdit} />
          <ItemDelete id={band.id} onDeleteClick={this.onDelete} />
          <ItemDetail id={band.id} onDetailClick={this.onDetail} name={band.bandname} />
          <td className="mm-detail">{band.startYear}</td>
          <td className="mm-detail">{band.endYear}</td>
          <td className="mm-detail">{band.genre}</td>
        </tr>)
    });
    return (
      <div className="container">
        <PageHeader title="Bands" />
        <button className="btn btn-lg btn-primary mm-create" onClick={this.newBand}>Add Band</button>
        <hr/>
        <table className="mm">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Formed</th>
              <th>Disbanded</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {bandList}
          </tbody>
        </table>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state,
    bands: state.bands,
  }
}

export default connect(mapStateToProps)(Bands);