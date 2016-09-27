import React from 'react';
import ReactDOM from 'react-dom';
import {post} from './misc';

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
    const json_or_error = post('/api/signin', {user_id: user_id}, {credentials: 'include'});
    if (json_or_error.response) {
        console.log(json_or_error);
        return;
    }
    location.href = '/index.html';
}

ReactDOM.render(<App />, document.getElementById('main'));
