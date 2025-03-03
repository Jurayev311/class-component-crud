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
            users: [],
            editUser: null
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { fname, lname, birthdate, gender, hobby, users, editUser } = this.state;
    
        if (editUser) {
            this.setState({
                users: users.map(user => 
                    user.id === editUser ? { ...user, fname, lname, birthdate, gender, hobby } : user
                ),
                fname: "",
                lname: "",
                birthdate: "",
                gender: "male",
                hobby: "",
                editUser: null,
            });
        } else {
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
        }
    };
    
    handleEdit = (id) => {
        const user = this.state.users.find(user => user.id === id);
        this.setState({
            fname: user.fname,
            lname: user.lname,
            birthdate: user.birthdate,
            gender: user.gender,
            hobby: user.hobby,
            editUser: id
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
                            {this.state.editUser ? "Save" : "Create"}
                        </button>

                    </form>
                </div>

                <div className="flex-1 p-6 bg-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Users List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {this.state.users.map((user) => (
                            <div key={user.id} className="flex items-center bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow duration-300">
                                <img
                                    src={user.gender === "male" ? male : female}
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{user.fname} {user.lname}</h3>
                                    <p className="text-gray-600 text-sm mt-1">📅 {user.birthdate}</p>
                                    <p className="text-gray-600 text-sm">🏆 {user.hobby}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => this.handleEdit(user.id)}
                                        className="bg-yellow-400 px-3 py-1 rounded-lg text-white hover:bg-yellow-500 transition-colors duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => this.handleDelete(user.id)}
                                        className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600 transition-colors duration-200"
                                    >
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
