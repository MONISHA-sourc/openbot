import React, { useState } from 'react';
import './ChatGPTApp.css';

function ChatGPTApp() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        if (!question.trim()) return;

        try {
            const response = await fetch('http://localhost:5001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: question }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log("Response data:", responseData); 
            const responseText = responseData.content; 
            setResponse(responseText); // Set response to the extracted text
        } catch (error) {
            console.error("There was an error!", error);
            setResponse("Sorry, we couldn't fetch the response. Please try again.");
        }
        setQuestion('');
    }

    return (
        <div className='app-container'>
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Ask me anything...'
                rows='4'
                className='question-input'
            />
            <button onClick={handleSubmit} className='submit-btn'>Ask</button>
            <div className='response-display'>{response}</div>
        </div>
    );
}

export default ChatGPTApp;
