import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/commission/';

class CommissionService {
    getDefences() {
        return axios.get(API_URL, { headers: authHeader() })
    }

    getDefence(id) {
        return axios.get(API_URL + id, { headers: authHeader() })
    }

    addQuestion(teamId, question, grade) {
        return axios.post(API_URL + teamId + "/question/create", { description: question, grade: grade }, { headers: authHeader() })
    }

}

export default new CommissionService();
