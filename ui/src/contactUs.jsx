
export default function ContactUs( props ) {
    return (
    <div>
       <div className="row">
        <div className="col-sm-6">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Facility Bookings</h5>
                <p className="card-text">You may approach the NUS Facilities Office to book other facilities.</p>
                <a href="https://uci.nus.edu.sg/suu/facilities/about-suu-utown-non-residential-facilities/facilities-booking-utown-non-residential-facilities/" className="btn btn-info">NUS Facilities Office</a>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Upcoming Sports Events</h5>
                <p className="card-text">You may approach the NUS Sports Club to find out more about Sporting events in NUS.</p>
                <a href="https://nus.edu.sg/osa/student-life/student-organisations-directory/sports" className="btn btn-info">NUS Sports</a>
            </div>
            </div>
        </div>
        </div>
    </div>
  
    );
  }
  