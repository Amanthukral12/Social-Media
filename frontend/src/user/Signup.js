import React, { Component } from 'react'

export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <form action="">
                    <div className="form-group">
                        <lable className="text-muted">Name</lable>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <lable className="text-muted">Email</lable>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <lable className="text-muted">password</lable>
                        <input type="password" className="form-control" />
                    </div>
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
