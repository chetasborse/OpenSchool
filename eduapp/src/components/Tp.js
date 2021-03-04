import axios from 'axios'
import { Component } from 'react'

class Tp extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: ''
        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        var body = {
            mail: this.state.email,
            name: this.state.name
        }
        axios.post("http://localhost:5000/users/sendmail", body)
        .then(res => {
            console.log(res)
            alert("Email sent successfully")
            this.setState({
                mail:"",
                name: "",
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    render() {
        return(
            <div className="toplookout">
                <form>
                    <label for="name">Name</label>
                    <input id="name" name="name" type="name" onChange={this.change} value={this.state.name}></input>
                    <br></br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" onChange={this.change} value={this.state.email}></input>
                    <br></br>
                    <button onClick={this.submit}>Send Mail</button>
                </form>
            </div>
        )
    }
}

export default Tp;