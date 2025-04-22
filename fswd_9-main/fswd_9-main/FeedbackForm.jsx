import { useState } from 'react';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setNameError('');
    setEmailError('');
    setMessageError('');
    
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    if (!message.trim()) {
      setMessageError('Feedback message is required');
      isValid = false;
    }
    
    if (isValid) {
      const feedbackData = {
        name,
        email,
        message,
        submittedAt: new Date().toLocaleString()
      };
      
      setSubmittedFeedback(feedbackData);
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }
  };
  
  return (
    <div className="container">
      <h1>Feedback Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={nameError ? 'error' : ''}
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? 'error' : ''}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Feedback:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className={messageError ? 'error' : ''}
          ></textarea>
          {messageError && <p className="error-message">{messageError}</p>}
        </div>
        
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
      
      {submittedFeedback && (
        <div className="feedback-display">
          <h2>Submitted Feedback:</h2>
          <p><strong>Name:</strong> {submittedFeedback.name}</p>
          <p><strong>Email:</strong> {submittedFeedback.email}</p>
          <p><strong>Message:</strong> {submittedFeedback.message}</p>
          <p><strong>Submitted at:</strong> {submittedFeedback.submittedAt}</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;