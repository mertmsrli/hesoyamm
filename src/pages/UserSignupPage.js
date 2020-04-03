import React from 'react';
import {signUp} from "../api/apiCalls";
import Input from "../components/Input";
import axios from "axios";

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event => {
        const {name, value} = event.target;
        /*const value = event.target.value;
        const name = event.target.name;*/
        //state'in kopyasını alma aşağıdaki koddur
        const errors = {...this.state.errors};
        errors[name] = undefined
        if (name == 'password' || name == 'passwordRepeat') {
            if (name == 'password' && value != this.state.passwordRepeat) {
                errors.passwordRepeat = 'Parolalar eşleşmiyor';
            } else if (name == 'passwordRepeat' && value != this.state.password) {
                errors.passwordRepeat = 'Parolalar eşleşmiyor';
            } else {
                errors.passwordRepeat = undefined
            }
        }

        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignUp = async event => {
        event.preventDefault();
        const {username, displayName, password} = this.state;
        const body = {
            username,
            displayName,
            password
        };
        /*const body = {
            username: username,
            displayName: displayName,
            password: password
        };*/
        this.setState({pendingApiCall: true});
        //axios.post('/api/1.0/users', body)

        try {
            const response = await axios.post('/api/1.0/users', body);
        } catch (error) {
            //console.log(com.mert.hesoyam.error.response.data);
            if (error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors});
            }

        }
        this.setState({pendingApiCall: false});
        /*signUp(body)
        .then(response => {this.setState({pendingApiCall:false});
    })
        .catch(com.mert.hesoyam.error=> {this.setState({pendingApiCall:false});
    });*/
    };

    /*onChangeUsername = event => {
        this.setState({
            username: event.target.value
        });
        console.log(this.state.username);
    };
    onChangeDisplayName = event => {
        this.setState({
            displayName: event.target.value
        });
        console.log(this.state.displayName);
    };
    onChangPassword = event => {
        this.setState({
            password: event.target.value
        });
        console.log(this.state.password);
    };
    onChangePasswordRepeat = event => {
        this.setState({
            passwordRepeat: event.target.value
        });
        console.log(this.state.passwordRepeat);
    };*/
    render() {
        const {pendingApiCall, errors} = this.state;
        const {username, displayName, password, passwordRepeat} = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                    {/* <div className="form-group">
                        <label>Username</label>
                        <input className={username ? "form-control is-invalid" : "form-control"} name="username"
                               onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {username}
                        </div>
                    </div>*/}
                    <Input name="displayName" label="DisplayName" error={displayName} onChange={this.onChange}/>
                    {/*<div className="form-group">

                        {<label>Display Name</label>
                        <input className={displayName ? "form-control is-invalid" : "form-control"} name="displayName"
                               onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {displayName}
                        </div>}
                    </div>*/}
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password"/>
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange}
                           type="password"/>
                    {/*<div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange}/>
                    </div>*/}
                    {/*<div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange}/>
                    </div>*/}
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat != undefined}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up
                        </button>
                    </div>

                </form>
            </div>


        );
    }
}

export default UserSignupPage;