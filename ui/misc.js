import axios from 'axios';

const post = (path, data, config) => {
    return axios.post(path, data, config)
        .then((response) => {
            if (Math.floor(response.status / 100) !== 2) {
                const error = new Error(response.statusText);
                error.response = response;
                return Promise.reject(error);
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

export {post}
