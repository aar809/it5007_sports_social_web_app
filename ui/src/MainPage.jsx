/* globals React */
/* eslint "react/jsx-no-undef": "off" */

import MainTable from './MainTable.jsx';
import graphQLFetch from './graphQLFetch.js';
import ContactUs from './contactUs.jsx';
import Stats from './Stats.jsx';
import Instructions from './Instructions.jsx';

export default class MainPage extends React.Component {
  constructor() {
    super();
    //this.state = { issues: [] };
    this.state = { locations: [], bookings: [], allbookings: []}
    this.createBooking = this.createBooking.bind(this);
    this.createJoin = this.createJoin.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      locationsList {
        id location created
        game players tags
      }
    }`;

    const query_now = `query {
      bookingsList {
        id location created 
        game players tags date hour
      }
    }`;

    const query_all = `query {
      bookingsListAll {
        id location created
        game players tags date hour
      }
    }`

    const getPromises = [
      graphQLFetch( query ),
      graphQLFetch( query_now ),
      graphQLFetch( query_all )
    ]

    const getResponses = await Promise.all(getPromises);
    // console.log("loaddata_getResponses", getResponses)
    if (getResponses) {
      this.setState( { locations: getResponses[0].locationsList, bookings: getResponses[1].bookingsList, allbookings: getResponses[2].bookingsListAll } )
    }
  }
  
  async createBooking(booking) {
    const query = `mutation bookingAdd($booking: BookingInputs!) {
      bookingAdd(booking: $booking) {
        id
      }
    }`;
    
    const data = await graphQLFetch(query, { booking });
    if (data) {
      this.loadData();
    }
  }

  async createJoin(joinInput) {
    const query = `mutation joinAdd($joinInput: JoinInputs!) {
      joinAdd(joinInput: $joinInput)
    }`

    const data = await graphQLFetch(query, {joinInput});
    if (data) {
      this.loadData();
    }
  }

  render() {
    //console.log("render", this.state)
    // console.log("render", this.state)
    return (
      <React.Fragment>
        <div className = "container">
          
        <div className="pos-f-t">
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
              <h5 className="text-white h4">Ready for a game. Anytime.</h5>
              <span className="text-muted">National University of Singapore</span>
              {/* <div className="text-white" fontSize = "5px">To use this Sport-Match, please click on the "Create" buttons corresponding to the location and time of interest.</div> */}
            </div>
          </div>
          <nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <h5 className="text-white h4">Sport-Match</h5>
          </nav>
        </div>
        
        <p>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1_28Nym0FjHcqzb_VxXee5JD9TwBzJ0sH&ehbc=2E312F"
              width="1200"
              height="350"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              className = "container"
            />
          </p>
        
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Stats</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-instructions-tab" data-toggle="pill" href="#pills-instructions" role="tab" aria-controls="pills-contact" aria-selected="false">Instructions</a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <hr />
            <MainTable locations={this.state.locations} createBooking = {this.createBooking} createJoin={this.createJoin} bookings={this.state.bookings} />
          <hr />
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Stats locations={this.state.locations} allbookings={this.state.allbookings}/>
        </div>
        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <ContactUs />
        </div>
        <div className="tab-pane fade" id="pills-instructions" role="tabpanel" aria-labelledby="pills-instructions-tab">
          <Instructions />
        </div>
      </div>
      </div>
 
      </React.Fragment>
    );
  }
}
