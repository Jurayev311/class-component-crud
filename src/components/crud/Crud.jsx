import React, { Component } from "react";
import male from '../../assets/male.png';
import female from '../../assets/female.png';

export default class SidebarCrud extends Component {
    constructor() {
        super();
        this.state = {
            fname: "",
            lname: "",
            birthdate: "",
            gender: "male",
            hobby: "",
            users: [],
            editId: null,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { fname, lname, birthdate, gender, hobby, users, editId } = this.state;

        if (editId !== null) {
            const editUser = users.map((user) => {
                if (user.id === editId) {
                    return { id: editId, fname, lname, birthdate, gender, hobby };
                }
                return user;
            });

            this.setState({
                users: editUser,
                fname: "",
                lname: "",
                birthdate: "",
                gender: "male",
                hobby: "",
                editId: null,
            });
        } else {
            const newUser = {
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

    handleEdit = (user) => {
        this.setState({ ...user, editId: user.id });
    };

    handleDelete = (id) => {
        this.setState({ users: this.state.users.filter((user) => user.id !== id) });
    };

    render() {
        return (
            <div className="h-screen flex bg-gray-100 text-gray-900">
                <div className="w-1/4 bg-white shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">User Crud</h2>
                    <form className="space-y-3" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="First Name" value={this.state.fname}
                            onChange={(e) => this.setState({ fname: e.target.value })} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Last Name" value={this.state.lname}
                            onChange={(e) => this.setState({ lname: e.target.value })} className="w-full p-2 border rounded" />
                        <input type="date" value={this.state.birthdate}
                            onChange={(e) => this.setState({ birthdate: e.target.value })} className="w-full p-2 border rounded" />
                        <select value={this.state.gender}
                            onChange={(e) => this.setState({ gender: e.target.value })} className="w-full p-2 border rounded">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="text" placeholder="Hobby" value={this.state.hobby}
                            onChange={(e) => this.setState({ hobby: e.target.value })} className="w-full p-2 border rounded" />
                        <button type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                            {this.state.editId !== null ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>

                <div className="w-3/4 p-6 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">User List</h2>
                    <div className="space-y-3">
                        {this.state.users.length ? (
                            this.state.users.map((user) => (
                                <div key={user.id} className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4">
                                    <img src={user.gender === "male" ? male : female} alt="Avatar"
                                        className="w-14 h-14 rounded-full border" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold">{user.fname} {user.lname}</h3>
                                        <p className="text-gray-600 text-sm">📅 {user.birthdate} | 🏆 {user.hobby}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => this.handleEdit(user)}
                                            className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-400 transition">Edit</button>
                                        <button onClick={() => this.handleDelete(user.id)}
                                            className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-500 transition">Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No users added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
