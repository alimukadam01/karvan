import React from 'react'
import './SendEmail.css'  

function SendEmail() {
  return (
    <div className='email-container'>
        <h2>Send us your feedback</h2>
        <p>
            Let us know what you think or even give us ideas on what you’d 
            want to see in our collections. In the end it’s all about you!
        </p>

        <form>
            <input type="text" placeholder='Name'/>
            <input type="text" placeholder='Email'/>
            <textarea  rows={6} cols={30} type="text" placeholder='Suggest something!'/>
            <button type='submit'>Submit Feedback</button>
        </form>
    </div>
  )
}

export default SendEmail