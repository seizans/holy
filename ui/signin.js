import 'whatwg-fetch';


let signin = (user_id) => {
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
        return response.json();
    }).catch((error) => {
        console.log(error);
        return error;
    });
};

let App = {
    init() {
        this.submitButton = document.getElementById("submit-button");
        this.userIdInput = document.getElementById("user-id");
        this.bind();
    },

    bind() {
        this.submitButton.addEventListener("click", e => {
            alert(this.userIdInput.value);
            signin(this.userIdInput.value).then((json_or_error) =>{
                if (json_or_error.response) {
                    console.log(json_or_error);
                    alert('error');
                }
                location.href = '/index.html';
            });
        });
    },
};

App.init();
