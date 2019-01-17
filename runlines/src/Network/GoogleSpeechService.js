import axios from 'axios';
// import {KEY} from './k';

export default class GoogleSpeechService {
    constructor() {

    }

    static instance = axios.create({
        baseURL: 'https://speech.googleapis.com',
        timeout: 20000,
    })

    // takes in audio data and config info as objects
    // static recognize(recognitionAudio) {
    //     return axios.post(127.0.0.1)
    // }

    // static passData = {
    // "config": {
    //     "encoding": "LINEAR16",
    //     "languageCode": "en-US",
    //     "sampleRateHertz": 22050

    // }, "audio": {
    //     "content": 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    // },

    // }


    //   }
    //       }

    static discover(encodedAudio) {
        let axios = this.instance;
        return axios.post(`/v1/speech:recognize/?key=KEY`, {
            "audio": {
                "content": encodedAudio,
            },
            "config": {
                "encoding": "MULAW",
                "languageCode": "en-US",
                "sampleRateHertz": 16000
            },
        }
        ).then((response) => {
            console.log('testing headers good')
            console.log(response.data)
            return Promise.resolve(response.data);
        })
            .catch((error) => {
                console.log('testing headers bad')
                console.log(error)
                return Promise.reject(error);
            });
    }


}


// method: 'post',
// url: '/user/12345',
// data: {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// }
// });