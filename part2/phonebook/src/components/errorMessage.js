import React from 'react';

const ErrorMessage = ({message}) => {
    const messageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 30,
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom: 40
    }

    if (message === null) {
        return (
            null
        )
    }
    return (
        <div style={messageStyle}>
            <em>{message}</em>
        </div>
    )
}

export default ErrorMessage;