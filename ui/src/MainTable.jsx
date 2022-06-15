/* globals React */
// import { useState } from 'react';

// This component gets passed into MainTable component, repeats for every TimeRow under each Location in the table. (eg. 3-4pm, 4-5pm etc.)
function LocationRow( props ) {
  //const [location2, setLocation] = useState([])
  const location = props.location;
  
  const createBooking = props.createBooking;
  const createJoin = props.createJoin;
  const bookings = props.bookings;
  
  function roundUpMinutes(date) {

    date.setHours(date.getHours() + Math.ceil(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
  
    return date;
  }
  
  function roundDownMinutes(date) {
  
    date.setHours(date.getHours() + Math.floor(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
  
    return date;
  }
  
  function parseTime(date) {
    var date1 = new Date(date.getTime())
    var date2 = new Date(date.getTime())
    const output = `${roundDownMinutes(date1).getHours()}:00 - ${roundUpMinutes(date2).getHours()}:00`
    return output
  } 

  function parseTags(ls) {
    const output = ls.filter(tag => tag.trim().length > 0);
    return output
  }

  // "Create" button function for each top Location header row.
  const handleSubmitCreate = (e, location) => {
    e.preventDefault();
    // console.log("HSC", location)
    const form = eval("document.forms.create" + location.id);
    // console.log("HSCform",form)
    const newGame = eval("form.inputGame" + location.id + ".value") ? eval("form.inputGame" + location.id + ".value") : "null";
    const newPlayers = eval("form.inputPlayers" + location.id + ".value") ? eval("form.inputPlayers" + location.id + ".value") : 0;
    const newTags = [eval("form.inputTag1" + location.id + ".value") ? eval("form.inputTag1" + location.id + ".value") : "", eval("form.inputTag2" + location.id + ".value") ? eval("form.inputTag2" + location.id + ".value") : "", eval("form.inputTag3" + location.id + ".value") ? eval("form.inputTag3" + location.id + ".value") : ""]
    const booking = {
      location: location.location,
      game: newGame,
      players: newPlayers,
      tags: newTags,
      created: new Date(new Date().getTime()),
      date: new Date().toLocaleString().split(',')[0],  // change to 04/30/22 format to be consistent
      hour: new Date().getHours()
    };
    console.log("handleSubmitCreate", booking)
    //console.log(form.elements["inputGame3"].value)
    props.createBooking(booking);
    document.getElementById(`create${location.id}`).reset()
  }

  // "Create" button function for each Time Row for each hour per location.
  const handleSubmitCreate2 = (e, HSC_date, plus_hours) => {
    e.preventDefault();
    // console.log(("document.forms.create" + location.id + "_" + HSC_date))
    const form = eval("document.forms.create" + location.id + "_" + HSC_date);
    // console.log("FORM", form)
    // console.log("HSCform",form)
    const newGame = eval("form.inputGame" + location.id + "_" + HSC_date + ".value") ? eval("form.inputGame" + location.id +  "_" + HSC_date + ".value") : "null";
    const newPlayers = eval("form.inputPlayers" + location.id +  "_" + HSC_date + ".value") ? eval("form.inputPlayers" + location.id +  "_" + HSC_date + ".value") : 0;
    const newTags = [eval("form.inputTag1" + location.id +  "_" + HSC_date + ".value") ? eval("form.inputTag1" + location.id +  "_" + HSC_date + ".value") : "", eval("form.inputTag2" + location.id +  "_" + HSC_date + ".value") ? eval("form.inputTag2" + location.id +  "_" + HSC_date + ".value") : "", eval("form.inputTag3" + location.id +  "_" + HSC_date + ".value") ? eval("form.inputTag3" + location.id +  "_" + HSC_date + ".value") : ""]
    // console.log(new Date().toLocaleString().split(',')[0])
    const newDate = new Date().addHours(plus_hours).toLocaleString().split(',')[0]
    // console.log(newDate)

    const booking = {
      location: location.location,
      game: newGame,
      players: newPlayers,
      tags: newTags,
      created: new Date(new Date().getTime()),
      date: newDate,
      hour: HSC_date
    };
    console.log("handleSubmitCreate", booking)
    //console.log(form.elements["inputGame3"].value)
    props.createBooking(booking);
    document.getElementById(`create${location.id}_${HSC_date}`).reset()
  }

/*
  const handleSubmitJoin = (e) => {
    e.preventDefault();
    const form = eval("document.forms.join" + location.id);
    const newPlayers = eval("form.inputPlayers" + location.id + ".value")
  }
*/

  // Join button function for the main Location header row
  const handleSubmitJoin = (e) => {
    e.preventDefault();
    // console.log(createJoin);
    const form = eval("document.forms.join" + location.id );
    const newPlayers = eval("form.inputPlayers" + location.id + ".value")
    const newDate = new Date().toLocaleString().split(',')[0]
    const newHour = new Date().getHours()
    const joinInput = {
      location: location.location,
      players: newPlayers,
      hour: newHour
    }
    // console.log("JOININPUT", joinInput)
    props.createJoin(joinInput);
    document.getElementById(`join${location.id}`).reset()
  }

  // Join button function for each Time Row below each Location.
  const handleSubmitJoin2 = (e,HSC_date, plus_hours) => {
    e.preventDefault();
    // console.log(createJoin);
    const form = eval("document.forms.join" + location.id + "_" + HSC_date);
    const newPlayers = eval("form.inputPlayers" + location.id + "_" + HSC_date + ".value")
    const newDate = new Date().addHours(plus_hours).toLocaleString().split(',')[0]


    const joinInput = {
      location: location.location,
      players: newPlayers,
      date: newDate,
      hour: HSC_date
    }
    // console.log("JOININPUT", joinInput)
    props.createJoin(joinInput);
    document.getElementById(`join${location.id}`).reset()
  }

  // all bookings are passed in, we need to match and pull the booking for the location
  var bookingToLoad = {
    created: null,
    game: null,
    players: null,
    tags: null,
  }
  // console.log("bookings", bookings)
  for (const booking of bookings) {
    //console.log(booking, location.location)
    // console.log("BOOKING", booking)
    if ((booking.location == location.location) && (booking.hour == new Date().getHours())) {
      bookingToLoad = booking
    }
  }
  // console.log("bookingToLoad",bookingToLoad)
  //console.log("location id", location.id)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  var daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  // console.log("day", new Date().getDay())
  const currentHour = new Date().getHours()
  var time = currentHour
  // const time = 22;  //set time manually for testing
  
  var times = []
  for (let i=1; i<11; i++){
    if (i+time < 23){
      times.push([time+i,i]) 
    }
    else if ( i+time === 23){
      times.push([time+i,i]) 
    }
    
    else {
    // times.push((i%24).toString() + ":00" + "-" + ((i%24)+1).toString() + ":00" + " (" + daysOfWeek[tomorrow.getDay()]+")")
    times.push([((time+i)%24),i])
    }
  }

  // console.log("location",location)

  function BTL(time){
    var bookingToLoad = {
      created: null,
      game: null,
      players: null,
      tags: null,
    }

    for (const booking of bookings) {
      // console.log("BOOKING", booking)
      if ((booking.location == location.location) && (booking.hour == time[0])) {
        bookingToLoad = booking
      }
    }
    return bookingToLoad
  }


  const timeRows = times.map(time => 
    <tr key={time[0]} name={time[0]}>
    {/* <td>{location.location}</td> */}
    <td className="text-center">{time[0]}:00 - {time[0]+1}:00</td>
    {/* <td>{(bookingToLoad.created) ? parseTime(bookingToLoad.created): ""}</td> */}
    <td className="text-center">{(BTL(time).game) ? BTL(time).game : "" }</td>
    <td className="text-center">{(BTL(time).players) ? BTL(time).players : ""}</td>
    {/* <td>{(BTL(time).tags) ? parseTags(BTL(time).tags) : ""}</td> */}
    <td className="text-center">{(BTL(time).tags) ? (BTL(time).tags.filter(tag => tag != "").map(tag => <span key={tag} className="badge badge-pill badge-info">{tag}</span>)) : ""}</td>
    
    <td location={location.location} className="text-center"> 
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#joinModal${location.id}_${time[0]}`}> Join </button>
        <div className="modal fade" id={`joinModal${location.id}_${time[0]}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Join Game!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form name={`join${location.id}_${time[0]}`} id={`join${location.id}_${time[0]}`}>
                <div className="mb-3">
                  <label htmlFor={`inputPlayers${location.id}_${time[0]}`} className="form-label"><strong>No. of Players</strong></label>
                  <input type="players" className="form-control" id={`inputPlayers${location.id}_${time[0]}`} aria-describedby="playersHelp"></input>
                  <div id="playersHelp" className="form-text"><em><small>How many are joining?</small></em></div>
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => handleSubmitJoin2(e,time[0],time[1])}>Join!</button>
              </div>
            </div>
          </div>
        </div> 
        <b> </b>

        <button type="button" className={((bookingToLoad.game != "") || (bookingToLoad.game)) ? "btn btn-success":"btn btn-secondary"} data-toggle="modal" data-target={`#createModal${location.id}_${time[0]}`} location={location.location}> Create </button>
        <div className="modal fade" id={`createModal${location.id}_${time[0]}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Game!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

              <form name={`create${location.id}_${time[0]}`} id={`create${location.id}_${time[0]}`} noValidate>
                <div className="mb-3">
                  <label htmlFor={`inputGame${location.id}_${time[0]}`} className="form-label"><strong>Game*</strong></label>
                  <input type="text" className="form-control" id={`inputGame${location.id}_${time[0]}`} name={`inputGame${location.id}_${time[0]}`} aria-describedby="gameHelp" required></input>
                  <div id="gameHelp" className="form-text"><em><small>What will you be playing?</small></em></div>
                  <div className="invalid-feedback">Please enter a game.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor={`inputPlayers${location.id}_${time[0]}`} className="form-label"><strong>No. of Players*</strong></label>
                  <input type="players" className="form-control" id={`inputPlayers${location.id}_${time[0]}`} name={`inputPlayers${location.id}_${time[0]}`} aria-describedby="playersHelp" required></input>
                  <div id="playersHelp" className="form-text"><em><small>How many players are coming?</small></em></div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag1${location.id}_${time[0]}`} className="form-label"><strong>Tag 1</strong></label>
                    <input type="tags" className="form-control" id={`inputTag1${location.id}_${time[0]}`} name={`inputTag1${location.id}_${time[0]}`} aria-describedby="tagsHelp"></input>
                    <div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag2${location.id}_${time[0]}`} className="form-label"><strong>Tag 2</strong></label>
                    <input type="tags" className="form-control" id={`inputTag2${location.id}_${time[0]}`} name={`inputTag2${location.id}_${time[0]}`} aria-describedby="tagsHelp"></input>
                    {/*<div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>*/}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag3${location.id}_${time[0]}`} className="form-label"><strong>Tag 3</strong></label>
                    <input type="tags" className="form-control" id={`inputTag3${location.id}_${time[0]}`} name={`inputTag3${location.id}_${time[0]}`} aria-describedby="tagsHelp"></input>
                    {/*<div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>*/}
                  </div>
                </div>
              </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-success" onClick={(e) => handleSubmitCreate2(e, time[0],time[1])} data-dismiss="modal">Create!</button>  {/*time[0] is the row's HOUR (for eg. 4,5,6...), time[1] is the INDEX (eg. 1,2,3...)*/}
                
              </div>
            </div>
          </div>
        </div> 
        <b> </b>
    </td>
    
  </tr>
  );

  var date = new Date()

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

  return (
  <tbody>
    <tr  className="accordion-toggle">
    {/* <td><button type="btn btn-default btn-xs" data-toggle="collapse" data-target={`#key${location.id}`}><span className="glyphicon glyphicon-eye-open"></span></button></td> */}
    <td><img className="arrow" src='https://img.icons8.com/material/480/expand-arrow--v1.png'
          alt='#'
          style={{ maxWidth: '2rem' }}
          data-toggle="collapse" data-target={`#key${location.id}`}/> </td>
      <td className="text-center">{location.id}</td>
      <td >
        <div className="grid">
        <div className="col"></div>  
        <div className="col"> <div className="row">{location.location}</div></div>
        <div className="col"></div> 
        <div className="col"> <div className="row">
          <small><span className="badge badge-pill badge-info" type="button" data-toggle="modal" data-target={`#mapModal${location.id}`}> Location </span></small>
            <div className="modal fade" id={`mapModal${location.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Location</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div></div>
                  <div className="modal-body">
                  <div className="modal-body">
                    <p><iframe width='400' height='300' frameBorder='0' src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=' + `${location.location}`}></iframe></p>
                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </td>
      {/* <td>{(bookingToLoad.created) ? parseTime(bookingToLoad.created): ""}</td> */}
      <td className="text-center"> {time}:00 - {time+1}:00 </td>
      <td className="text-center">{(bookingToLoad.game) ? bookingToLoad.game : "" }</td>
      <td className="text-center">{(bookingToLoad.players) ? bookingToLoad.players : ""}</td>
      <td className="text-center">{(bookingToLoad.tags) ? (bookingToLoad.tags.filter(tag => tag != "").map(tag => <span key={tag} className="badge badge-pill badge-info">{tag}</span>)) : ""}</td>
      <td location={location.location} className="text-center">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#joinModal${location.id}`}> Join </button>
        <div className="modal fade" id={`joinModal${location.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Join Game!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form name={`join${location.id}`} id={`join${location.id}`}>
                <div className="mb-3">
                  <label htmlFor={`inputPlayers${location.id}`} className="form-label"><strong>No. of Players</strong></label>
                  <input type="players" className="form-control" id={`inputPlayers${location.id}`} aria-describedby="playersHelp"></input>
                  <div id="playersHelp" className="form-text"><em><small>How many are joining?</small></em></div>
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => handleSubmitJoin(e)}>Join!</button>
              </div>
            </div>
          </div>
        </div> 
        <b> </b>

        <button type="button" className={((bookingToLoad.game != "") || (bookingToLoad.game)) ? "btn btn-success":"btn btn-secondary"} data-toggle="modal" data-target={`#createModal${location.id}`} location={location.location}> Create </button>
        <div className="modal fade" id={`createModal${location.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Game!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

              <form name={`create${location.id}`} id={`create${location.id}`} noValidate>
                <div className="mb-3">
                  <label htmlFor={`inputGame${location.id}`} className="form-label"><strong>Game*</strong></label>
                  <input type="text" className="form-control" id={`inputGame${location.id}`} name={`inputGame${location.id}`} aria-describedby="gameHelp" required></input>
                  <div id="gameHelp" className="form-text"><em><small>What will you be playing?</small></em></div>
                  <div className="invalid-feedback">Please enter a game.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor={`inputPlayers${location.id}`} className="form-label"><strong>No. of Players*</strong></label>
                  <input type="players" className="form-control" id={`inputPlayers${location.id}`} name={`inputPlayers${location.id}`} aria-describedby="playersHelp" required></input>
                  <div id="playersHelp" className="form-text"><em><small>How many players are coming?</small></em></div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag1${location.id}`} className="form-label"><strong>Tag 1</strong></label>
                    <input type="tags" className="form-control" id={`inputTag1${location.id}`} name={`inputTag1${location.id}`} aria-describedby="tagsHelp"></input>
                    <div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag2${location.id}`} className="form-label"><strong>Tag 2</strong></label>
                    <input type="tags" className="form-control" id={`inputTag2${location.id}`} name={`inputTag2${location.id}`} aria-describedby="tagsHelp"></input>
                    {/*<div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>*/}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor={`inputTag3${location.id}`} className="form-label"><strong>Tag 3</strong></label>
                    <input type="tags" className="form-control" id={`inputTag3${location.id}`} name={`inputTag3${location.id}`} aria-describedby="tagsHelp"></input>
                    {/*<div id="tagsHelp" className="form-text"><em><small>What kind of players are you looking for?</small></em></div>*/}
                  </div>
                </div>
              </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-success" onClick={(e) => handleSubmitCreate(e, location,date)} data-dismiss="modal">Create!</button>
              </div>
            </div>
          </div>
        </div> 
        <b> </b>
      </td>

        </tr>
        <tr>
            <td colSpan="12" className="hiddenRow">
							<div className="accordian-body collapse" id={`key${location.id}`}> 
              <table className="table table-striped">
                    <thead className="table-active">
                      <tr className="info">
                        {/* <th className="text-center">Location</th> */}
                        <th className="text-center">Time</th>
                        <th className="text-center">Game</th>
                        <th className="text-center">Players</th>
                        <th className="text-center">Tags</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>	
								  		
                      <tbody>

                        {timeRows}

                      </tbody>
               	</table>
              
              </div> 
          </td>
        </tr>

    </tbody>

  );
}

export default function MainTable( props ) {
  const createBooking = props.createBooking;
  const createJoin = props.createJoin;
  //console.log("MainTable", props.bookings)
  const rows = props.locations.map(x =>
    <LocationRow key={x.id} location={x} createBooking={createBooking} createJoin={createJoin} bookings={props.bookings}/>
  );
  return (
    <div>
    <table className="table table-condensed table-striped">
      <thead className="thead-dark">
        <tr>          
          <th></th>
            <th className="text-center">ID</th>
            <th className="text-center">Location</th>
            <th className="text-center">Time</th>
            <th className="text-center">Game</th>
            <th className="text-center">Players</th>
            <th className="text-center">Tags</th>
            <th className="text-center">Actions</th>
        </tr>
      </thead>

        {rows}

    </table>       
</div>

  );
}
