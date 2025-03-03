import React, { Component } from "react";
import male from '../../assets/male.png';
import female from '../../assets/female.png';

export default class Crud extends Component {
    constructor() {
        super();
        this.state = {
            fname: "",
            lname: "",
            birthdate: "",
            gender: "male",
            hobby: "",
            users: []
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { fname, lname, birthdate, gender, hobby, users } = this.state;
        
        let newUser = {
            id: Date.now(),
            fname,
            lname,
            birthdate,
            gender,
            hobby,
        };
        
        this.setState({
            users: [...users, newUser],
            fname: "",
            lname: "",
            birthdate: "",
            gender: "male",
            hobby: "",
        });
    };

    handleDelete = (id) => {
        this.setState({ users: this.state.users.filter((user) => user.id !== id) });
    };

    render() {
        return (
            <div className="h-screen flex">
                <div className="w-72 bg-slate-200 text-black p-6 flex flex-col space-y-4 shadow-lg">
                    <h2 className="text-2xl font-bold">Add User</h2>
                    <form onSubmit={this.handleSubmit} className="flex flex-col space-y-3">
                        <input type="text" value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} placeholder="First Name" required className="p-2 bg-white text-black rounded" />
                        <input type="text" value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} placeholder="Last Name" required className="p-2 bg-white text-black rounded" />
                        <input type="date" value={this.state.birthdate} onChange={e => this.setState({ birthdate: e.target.value })} required className="p-2 bg-white text-black rounded" />
                        <select value={this.state.gender} onChange={e => this.setState({ gender: e.target.value })} className="p-2 bg-white text-black rounded">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="text" value={this.state.hobby} onChange={e => this.setState({ hobby: e.target.value })} placeholder="Hobby" required className="p-2 bg-white text-black rounded" />
                        <button type="submit" className="bg-white text-blue-600 p-2 rounded active:scale-95 transition">
                            Submit
                        </button>
                    </form>
                </div>

                <div className="flex-1 p-6 bg-gray-100">
                    <h2 className="text-2xl font-bold mb-4">Users List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {this.state.users.map((user) => (
                            <div key={user.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
                                <img src={user.gender === "male" ? male : female} alt="Avatar" className="w-14 h-14 rounded-full border mr-4" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{user.fname} {user.lname}</h3>
                                    <p className="text-gray-600 text-sm">📅 {user.birthdate} | 🏆 {user.hobby}</p>
                                </div>
                                <div className="flex gap-3">
                                <button onClick={() => this.handleEdit(user.id)} className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-400-400 transition">
                                    edit
                                </button>
                                <button onClick={() => this.handleDelete(user.id)} className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-400 transition">
                                    Delete
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
