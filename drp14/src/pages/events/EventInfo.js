import React, { Component } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./EventInfo.css"

class EventInfo extends Component {
    render() {
        return (
            <div className='eventInfoContainer'>
                <div className='eventInfoWrapper'>
                    <h1 className='eventTitle'>Tao's Pool Party</h1>
                    <div className='eventAddress'>
                        <LocationOnIcon/>
                        <span>Ethos Pools</span>
                    </div>
                    <div className='eventImages'>
                        {/* Map over list of images and render the following: */}
                        <div className='eventImage__wrapper'>
                            <img className='eventImage' src='' alt='' />
                        </div>
                    </div>
                    <div className='eventDetails'>
                        <div className='eventDetailsText'>
                            <h1>Event Details</h1>
                            <p>Big description here</p>
                        </div>
                        <div className='eventDetailsRSVP'>
                            <h1>Interested?</h1>
                            <span>text</span>
                            <h2>more text</h2>
                            <button>RSVP</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventInfo;