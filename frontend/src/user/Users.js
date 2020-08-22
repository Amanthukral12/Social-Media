import React, { Component } from 'react'
import { list } from './apiUser';
export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }
        })
    }
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

            </div>
        )
    }
}
