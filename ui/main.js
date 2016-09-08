import 'whatwg-fetch';
import {Socket, Presence} from "./phoenix";


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
        this.connectButton = document.getElementById("connect-button")
        this.bind()
    },

    bind() {
        this.connectButton.addEventListener("click", e => {
            join(1).then((json_or_error) =>{
                if (json_or_error.response) {
                    console.log(json_or_error);
                    alert('error');
                    return;
                }
                console.log(json_or_error.user_id);
                return;
            });
        })
    },

}
App.init()
