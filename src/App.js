/*
import './App.css';
import SidebarLayout from "./layouts/sidebar.layout";
import MainContentLayout from "./layouts/main-content.layout";
import authService from "./services/auth.service";
import {useState} from "@types/react";

function App() {
    const user = authService.getCurrentUser();
    const [isLogin, setIsLogin] = useState(true);
    if (user) {

    }
    return (
        <div className="wrapper d-flex align-items-stretch">
            <SidebarLayout></SidebarLayout>
            <MainContentLayout></MainContentLayout>
        </div>
    );
}

export default App;
*/

import './App.css';
import {Component} from "react";
import AuthService from "./services/auth.service";
import SidebarLayout from "./layouts/sidebar.layout";
import MainContentLayout from "./layouts/main-content.layout";
import LoginPage from "./pages/common/login.page";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showStudentBoard: false,
            showProfessorBoard: false,
            showCommissionBoard: false,
            showSecretaryBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            isGuestAccount: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showStudentBoard: user.role.includes("ROLE_USER"),
                showProfessorBoard: user.role.includes("ROLE_PROFESSOR"),
                showCommissionBoard: user.role.includes("ROLE_COMMISSION"),
                showAdminBoard: user.role.includes("ROLE_ADMIN"),
                showSecretaryBoard: user.role.includes("ROLE_SECRETARY")
            });
        } else {
            this.setState({
                isGuestAccount: true
            });
        }

    }

    render() {
        return (
            <div>
                {this.state.isGuestAccount &&
                    <div className="d-flex align-items-center justify-content-center">
                        <LoginPage/>
                    </div>
                }
                {!this.state.isGuestAccount &&
                    <div className="wrapper d-flex align-items-stretch">
                        {!this.state.showAdminBoard && !this.state.showCommissionBoard &&
                            <SidebarLayout isStudent={this.state.showStudentBoard}
                                           isProffessor={this.state.showProfessorBoard}
                                           isSecretary={this.state.showSecretaryBoard}/>
                        }
                        <MainContentLayout isStudent={this.state.showStudentBoard}
                                           isProffessor={this.state.showProfessorBoard}
                                           isCommission={this.state.showCommissionBoard}
                                           isAdmin={this.state.showAdminBoard}
                                           isSecretary={this.state.showSecretaryBoard}/>
                    </div>
                }
            </div>
        );
    }

}

export default App;

/*
            <div className="wrapper d-flex align-items-stretch">
                <LoginPage/>
            </div>
{this.state.isGuestAccount && <LoginPage/>}

 */
