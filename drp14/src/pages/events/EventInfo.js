import React, { Component } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./EventInfo.css"

class EventInfo extends Component {
    state = {
        images: [
            "/swimming1.jpg",
            "/swimming2.jpg",
            "/swimming3.jpg",
            "/swimming4.jpg",
            "/swimming6.jpg",
            "/swimming5.jpg",
            ]
    }

    render() {
        return (
            <div className='eventInfoContainer'>
                <div className='eventInfoWrapper'>
                    <h1 className='eventTitle'>Tao's Pool Party</h1>
                    <div className='eventAddress'>
                        <LocationOnIcon/>
                        <span>Ethos Pools</span>
                    </div>
                    <span className='eventCategory'>Swimming</span>
                    <div className='eventImages'>
                        {/* Map over list of images and render the following: */}
                        {this.state.images.map(img => 
                            <div className='eventImage__wrapper'>
                                <img className='eventImage' src={img} alt='' />
                            </div>
                            )}
                        
                    </div>
                    <div className='eventDetails'>
                        <div className='eventDetailsText'>
                            <h1>Event Details/Description?</h1>
                            <p>On Sunday 23rd April 2023 we will be attempting 
                                our own world record of the world’s largest 
                                uncontested rugby scrum on the hallowed pitch, 
                                The Close, Rugby School. The current world 
                                record is 2,586 people, so we are looking for 
                                3,000 school children aged between 10 and 17 
                                (18 if still at school) to help use achieve this 
                                huge feat! We are inviting schools and rugby 
                                football clubs to come and take part. There is 
                                a nominal £5 entry fee per person that will 
                                include a certificate of participation and a 
                                t-shirt. For further details see our registration 
                                page or email 2023@rugbyschool.net 
                                https://www.rugbyschool.co.uk/events/
                                worlds-largest-rugby-scrum/
                            </p>
                        </div>
                        <div className='eventDetailsRSVP'>
                            <h1>Host Details</h1>
                            <p>Tao Wang</p>
                            <p>20wang.t@gmail.com</p>
                            <h2>Try it out today!</h2>
                            <button>RSVP</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventInfo;