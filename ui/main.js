import 'whatwg-fetch';
import {Socket, Presence} from "./phoenix";


let create = (user_id) => {
    const data = new FormData();
    data.append('user_id', user_id);

    return fetch('/api/create', {
        method: 'POST',
        body: data
    }).then((response) => {
        if (response.status !== 201) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
    }).catch((error) => {
        console.log(error);
        return error;
    });
}

let join = (user_id) => {
    const data = new FormData();
    data.append('user_id', user_id);

    return fetch('/api/join', {
        method: 'POST',
        body: data
    }).then((response) => {
        if (response.status !== 200) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
    }).catch((error) => {
        console.log(error);
        return error;
    });
}

let App = {
    init() {
        if(!true){ return }

        this.connectButton = document.getElementById("connect-button");
        this.userIdContainer = document.getElementById("user-id");
        this.hpsContainer = document.getElementById("hps");
        this.createButton = document.getElementById("create-button");
        this.attackButton = document.getElementById("attack-button");
        this.render_hps();
        this.bind();
    },

    bind() {
        this.connectButton.addEventListener("click", e => {
            join(1).then((json_or_error) =>{
                if (json_or_error.response) {
                    console.log(json_or_error);
                    alert('error');
                    return;
                }
                let token = json_or_error.token;
                this.userIdContainer.innerHTML = 'Token: ' + token;

                let socket = new Socket("/socket", {
                    params: {token: token}
                });
                socket.connect();
                let room_id = 3;
                this.channel = socket.channel("room:" + room_id);
                this.channel.join()
                    .receive('ok', ({data}) => {console.log('ok')})
                    .receive('error', resp => {console.log('join failed!', resp)})

                return;
            });
        });

        this.createButton.addEventListener("click", e => {
            create(1).then((json_or_error) =>{
                if (json_or_error.response) {
                    console.log(json_or_error);
                    alert('error');
                    return;
                }
                console.log("CREATE SUCCESS");
                return;
            });
        });

        this.attackButton.addEventListener("click", e => {
            // ws で送る
            console.log("attacked");
        });
    },

    render_hps() {
        let hps = [
            {name: 'enemy', value: 100},
            {name: 'ally1', value: 20},
            {name: 'ally2', value: 15},
            {name: 'ally3', value: 30},
        ]
        this.hpsContainer.innerHTML = hps.map(hp => {
            return `<br />${hp.name}: ${hp.value}`;
        }).join("");
    },

}
App.init()
