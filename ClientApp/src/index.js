import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// components
import Header from './components/Header';
import { Home } from './screens';
import { Bands, BandCreate, BandEdit, BandDetail } from './screens/bands';
import { Artists, ArtistCreate, ArtistEdit, ArtistDetail } from './screens/artists';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Register from './screens/Register';

let initState = {
    activeId: '',
    bandName: '',
    startYear: '',
    endYear: '',
    genre: '',
    artists: [],
    artistFrist: '',
    artistLast: '',
    artistStage: '',
    username: '',
    password: '',
    loggedIn: '',
    email: '',
    registrationStatus: '',
    err: ''
}

function reducer(state = initState, { type, payload }) {
    switch (type) {
        case 'UPDATE_BANDS':
            console.log("case UPDATE_BANDS");
            return {
                ...state, bands: payload
            }
            break;
        case 'BAND_UPDATENAME':
            console.log("case BAND_UPDATENAME");
            return {
                ...state, bandName: payload
            }
            break;
        case 'BAND_UPDATESTART':
            console.log("case BAND_UPDATESTART");
            return {
                ...state, startYear: payload
            }
            break;
        case 'BAND_UPDATEEND':
            console.log("case BAND_UPDATEEND");
            return {
                ...state, endYear: payload
            }
            break;
        case 'BAND_UPDATEGENRE':
            console.log("case BAND_UPDATEGENRE");
            return {
                ...state, genre: payload
            }
            break;
        case 'BAND_EDIT':
            console.log("case BAND_EDIT");
            return {
                ...state, band: payload
            }
            break;
        case 'UPDATE_ARTISTS':
            return {
                ...state, artists: payload
            }
            break;
        case 'ARTIST_UPDATEFIRST':
            return {
                ...state, artistFirst: payload
            }
            break;
        case 'ARTIST_UPDATELAST':
            return {
                ...state, artistLast: payload
            }
            break;
        case 'ARTIST_UPDATESTAGE':
            return {
                ...state, artistStage: payload
            }
            break;
        case 'UPDATE_ACTIVE_ID':
            console.log("case UPDATE_ACTIVE_ID");
            return {
                ...state, activeId: payload
            }
            break;
        case 'MATCHUPS':
            return {
                ...state, matchups: payload
            }
            break;
        case 'LOGIN_ADD_USERNAME':
            console.log("case LOGIN_ADD_USERNAME");
            return {
                ...state, username: payload
            }
            break;
        case 'LOGIN_ADD_PASSWORD':
            console.log("case LOGIN_ADD_PASSWORD");
            return {
                ...state, password: payload
            }
            break;
        case 'LOGIN_UPDATE_LOGGEDIN':
            console.log("case LOGIN_UPDATE_LOGGEDIN");
            return {
                ...state, loggedIn: payload
            }
            break;
        case 'REGISTER_EMAIL':
            console.log("case REGISTER_EMAIL")
            return {
                ...state, email: payload
            }
            break;
        case 'REGISTER_PASSWORD':
            console.log("case REGISTER_PASSWORD")
            return {
                ...state, password: payload
            }
            break;
        case 'REGISTER_USERNAME':
            console.log("case REGISTER_USERNAME")
            return {
                ...state, username: payload
            }
            break;
        case 'REGISTRATION_STATUS':
            console.log("case REGISTRATION_STATUS")
            return {
                ...state, registrationStatus: payload
            }
            break;
        case 'REGISTER_RESULTS':
            console.log("case REGISTER_RESULTS")
            return {
                ...state, results: payload
            }
            break;
        case 'REGISTER_ERR':
            console.log("case REGISTER_ERR")
            return {
                ...state, err: payload
            }
            break;
        case 'UPDATEPROJNAME':
            return {
                ...state, projectName: payload
            }
            break;
        case 'UPADTEPROJDESC':
            return {
                ...state, projectDesc: payload
            }
            break;
        default:
            console.log("case default");
            return state;
    }
}

const store = createStore(
    reducer,
    {
        activeId: '',
        bands: [],
        bandName: "",
        startYear: null,
        endYear: null,
        genre: "",
        artists: [],
        artistFirst: '',
        artistLast: '',
        artistStage: '',
        matchups: [],
        projectName: "Music Matchup",
        projectDesc: "For our project, we decided to create a “music matchup” application that will allow users to keep track of individual artists, and the various bands that they have been associated with. Users would be able to register, and once registered, would be able to add/remove artists and bands, and associate which artists were ever a part of which bands."
    },
    window.devToolsExtension && window.devToolsExtension()
);

const mapStateToProps = (state) => {
    return {
        ...state,
        bands: state.bands
    }
}

const Index = ({ store }) => (
    <Router>
        <div className="wrap">
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/bands" component={Bands} />
            <Route path="/bands/new" component={BandCreate} />
            <Route path="/bands/edit" component={BandEdit} />
            <Route path="/bands/detail" component={BandDetail} />
            <Route exact path="/artists" component={Artists} />
            <Route path="/artists/new" component={ArtistCreate} />
            <Route path="/artists/edit" component={ArtistEdit} />
            <Route path="/artists/detail" component={ArtistDetail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
        </div>
    </Router>
);

connect(mapStateToProps)(Index);

render(
    <Provider store={store}>
        <div>
            <Index />
        </div>
    </Provider>,
    document.getElementById('root')
);