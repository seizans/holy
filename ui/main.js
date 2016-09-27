import React from 'react';
import ReactDOM from 'react-dom';
import {post} from './misc'
import {Socket, Presence} from './phoenix';

// TODO(seizans): 初期読み込み時に me API を叩いて認証チェックする。cookie 無いか認証失敗で signin.html へ。
const App = () => {
    const initialHps = [
        {name: 'enemy', value: 100},
        {name: 'ally1', value: 20},
        {name: 'ally2', value: 15},
        {name: 'ally3', value: 30},
    ]
    return (<div>
        <h2>Welcome!!</h2>
        <CreateButton />
        <ConnectButton />
        <UserIdContainer />
        <HpsContainer hps={initialHps} />
        <AttackButton />
    </div>)
}

class UserIdContainer extends React.Component {
    render() {
        return (<div>
        </div>);
    }
}

const Hp = (props) => {
    return <li>{props.hp.name}: {props.hp.value}</li>
}

const HpsContainer = (props) => {
    return (<ul>{
        props.hps.map((hp) => {
            return <Hp key={hp.name} hp={hp} />
        })
    }</ul>)
}

class CreateButton extends React.Component {
    onClick(ev) {
        create(1).then((json_or_error) => {
            if (json_or_error.response) {
                console.log(json_or_error);
                alert('error');
                return;
            }
            console.log("CREATE SUCCESS");
            return;
        });
    }
    render() {
        return <input type='button' value='Create Room' onClick={this.onClick} />
    }
}

class ConnectButton extends React.Component {
    onClick(ev) {
        join(1).then((json_or_error) => {
            if (json_or_error.response) {
                console.log(json_or_error);
                alert('error');
                return;
            }
            const token = json_or_error.token;
            // TODO(seizans): 後で復活させる
            // this.userIdContainer.innerHTML = 'Token: ' + token;

            const socket = new Socket("/socket", {
                params: {token: token}
            });
            socket.connect();
            let room_id = 3;
            const channel = socket.channel("room:" + room_id);
            channel.join()
                .receive('ok', ({data}) => {console.log('ok')})
                .receive('error', resp => {console.log('join failed!', resp)})
        });
    }
    render() {
        return <input type="button" value="CONNECT" onClick={this.onClick} />
    }
}

class AttackButton extends React.Component {
    onClick(ev) {
        // ws で送る
        console.log("attacked");
    }
    render() {
        return <input type="button" value="ATTACK" onClick={this.onClick} />
    }
}

const create = (user_id) => {
    return post('/api/create', {user_id: user_id});
}

const join = (user_id) => {
    return post('/api/join', {user_id: user_id});
}

ReactDOM.render(<App />, document.querySelector(".jumbotron"))
