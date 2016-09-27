import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    onClickRequest(ev) {
        signin(this.refs.userId.value);
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
    return axios.post('/api/signin', {user_id: user_id}, {credentials: 'include'})
        .then((response) => {
            if (response.status !== 204) {
                const error = new Error(response.statusText);
                return Promise.reject(error);
            }
            location.href = '/index.html';
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

ReactDOM.render(<App />, document.getElementById('main'));
