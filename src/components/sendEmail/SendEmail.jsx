import React from 'react'
import './SendEmail.css' 
import { useState } from 'react' 
import { sendEmail } from '../../services/api'
import { showErrorToast, showSuccessToast } from '../../services/utils'

function SendEmail() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleFieldChange = (e)=>{
    const { name, value } = e.target;
    setFormData((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      console.log(formData)
      const { name, email, message } = formData  
      const is_sent = await sendEmail(name, email, message)

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
        <h4>Send us your feedback</h4>
        <p>
            Let us know what you think or even give us ideas on what you’d 
            want to see in our collections. In the end it’s all about you!
        </p>

        <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleFieldChange} />
            <input type="text" name='email' placeholder='Email' value={formData.email} onChange={handleFieldChange} />
            <textarea name='message' rows={6} cols={30} type="text" placeholder='Suggest something!' value={formData.message} onChange={handleFieldChange} />
            <button type='submit'>Submit Feedback</button>
        </form>
    </div>
  )
}

export default SendEmail