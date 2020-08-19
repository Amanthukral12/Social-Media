import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false
        };
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value });
    };

    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state
        const user = {
            email,
            password
        };
        this.signin(user)
            .then(data => {
                if (data.error) this.setState({ error: data.error })
                else {
                    this.authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })
                }
            })
    };

    signin = (user) => {
        return fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err));
    }

    render() {

        if (this.state.redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>

                <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }}>{this.state.error}</div>


                <form action="">

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
