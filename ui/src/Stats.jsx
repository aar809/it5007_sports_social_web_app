export default function Charts( props ) {
    const allbookings = props.allbookings;
    //console.log("charts",allbookings);
    const locations = props.locations;
    // console.log("charts locations", locations)
    const display_data = {};
    for (const location of locations) {display_data[location.location] = 0};
    //console.log("charts display", display_data)
    for (const booking of allbookings) {
        for (const location of locations) {
            if (booking.location == location.location) {
                display_data[location.location] += 1
            }
        }
    }
    // console.log("charts display", display_data);

    const cards = locations.map(location => 
        <div className="card" key={location.location}>
            <div className="card-body">
            <h5 className="card-title">{location.location}</h5>
            <div className="card-text">Cumulative No. of Bookings: <h3>{display_data[location.location]}</h3></div>
            </div>
            <div className="card-footer">
            </div>
        </div>
        )
    return (
        <div>
        {cards}
        </div>
    );
  }