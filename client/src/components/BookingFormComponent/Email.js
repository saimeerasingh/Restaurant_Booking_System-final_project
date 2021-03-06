import React from 'react';
import emailjs from 'emailjs-com';
import emailkey from '../../emailkey';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fireSwal = withReactContent(Swal);

const Email = ({ bookingFormComplete, bookings, startTime, name, email }) => {

    function sendEmail(e) {
        e.preventDefault();    
    
        emailjs.sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID, e.target, emailkey.USER_ID)
          .then((result) => {
              fireSwal.fire(
                'Success',
                'Email sent',
                'success'
              )
          }, (error) => {
              console.log(error.text);
          });

      }

      const handleClick = () => window.location.reload(); 

      const index = bookings.length -1;

      const start = new Date(startTime);

      return (
        !bookingFormComplete ? "" :
        
        <div className='form-container'>
          <div id = "form">
        
          
       
        <form id="emailForm" onSubmit={sendEmail}>
          <div className="field">
          <label>Booking Ref:</label>
          <input className='input' type="text" name="booking_ref" value={bookings[index].id} readOnly required />
          </div>
          <br/>
           <div className="field">
           <label>Name:</label>
          <input className='input' type="text" name="to_name" value={name} readOnly required />
          </div>
          <br/>
          <div className="field">
          <label>Email:</label>
          <input className='input' type="email" name="to_email" value={email} readOnly required />
          </div>
          <br/>
          <div className="field">
          <label>Message:</label>
          <textarea className='textArea'  name="message" cols="50" rows="10" value={`Booking on ${start.toLocaleString()} confirmed.`} readOnly required/>
          </div>
          <br/>
          <input className='style-button' type="submit" value="Send Email Confirmation" autoFocus/>
        </form>

        <br/>
        <div>
          <button className='style-button'  type='button' onClick={handleClick}>Clear Form</button>
        </div>
        </div>
        </div>
        
      );
}

export default Email;
