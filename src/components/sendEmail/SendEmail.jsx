import React from 'react'
import './SendEmail.css' 
import { useState } from 'react' 
import { sendEmail } from '../../services/api'
import { showErrorToast, showSuccessToast } from '../../services/utils'

function SendEmail() {

  const [formData, setFormData] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const is_sent = await sendEmail(...formData)

      if (is_sent){
        showSuccessToast("Email Sent Successfully!")
      }else{
        showErrorToast("Oops! we ran into a problem. Please try again.")
      }
    }catch(error){
      console.log(error)
      showErrorToast("Oops! we ran into a problem. Please try again.")
    }
  }

  return (
    <div className='email-container'>
        <h2>Send us your feedback</h2>
        <p>
            Let us know what you think or even give us ideas on what you’d 
            want to see in our collections. In the end it’s all about you!
        </p>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name'/>
            <input type="text" placeholder='Email'/>
            <textarea  rows={6} cols={30} type="text" placeholder='Suggest something!'/>
            <button type='submit'>Submit Feedback</button>
        </form>
    </div>
  )
}

export default SendEmail