import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

class App extends React.Component {
    onClickRequest(ev) {
        signin(this.refs.userId);
    }

    render() {
        console.log('Start Rendering');
        return (<div>
            <input ref='userId' />
            <button onClick={this.onClickRequest.bind(this)}>Enjoy!!</button>
        </div>);
    }
};

const signin = (user_id) => {
    const data = new FormData();
    data.append('user_id', user_id);
    return fetch('/api/signin', {
        method: 'POST',
        credentials: 'include',
        body: data
    }).then((response) => {
        if (response.status !== 204) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        location.href = '/index.html';
    }).catch((error) => {
        console.log(error);
        return error;
    });
};

ReactDOM.render(<App />, document.getElementById('main'));
