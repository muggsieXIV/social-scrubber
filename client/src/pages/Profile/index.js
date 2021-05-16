import React from 'react'
import {BrowserRouter as Router, Switch} from "react-router-dom"


export default function Profile(props) {
    
    return (
        <div className="container">
            <div>
                <h3>Your Profile</h3>
                <br></br>
                <p>Edit the contact information for your message templates: </p>
                <form action="" className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input className="form-control text-left" type="text" name="name" placeholder="Full Name"></input>
                    <br></br>
                    <label htmlFor="email">Email: </label>
                    <input className="form-control text-left" type="email" name="email" placeholder="Email Address"></input>
                    <br></br>
                    <label htmlFor="phone">Phone: </label>
                    <input className="form-control text-left" type="phone" name="phone" placeholder="phone"></input>
                </form>
                <p>Link your socials:</p>
                <button className="btn btn-primary m-3">Twitter</button>
                <button className="btn btn-primary m-3">Facebook</button>
                <button className="btn btn-primary m-3">Instagram</button>
                <button className="btn btn-primary m-3">Linkedin</button>
            </div>
            <hr></hr>
            <div className="row">
                    <div className="col-sm-6 col-lg-6">
                        <h4>Create a Message Template: </h4>
                        <form action="" className="form-group">
                            <label htmlFor="msgName">Message Name: </label>
                            <input className="form-control text-left" type="text" name="msgName"></input>
                            <br></br>
                            <label htmlFor="name">Message Heading: </label>
                            <input className="form-control text-left" type="text" name="heading"></input>
                            <br></br>
                            <label htmlFor="message">Message: </label>
                            <textarea className="form-control text-left" name="message"></textarea>
                            <br></br>
                            <label htmlFor="signature">Signature:</label>
                            <input className="form-control text-left" name="signature" type="text"></input>
                            <br></br>
                            <label htmlFor="addContact">Add Contact Info: </label>
                            <input className="text-left ml-1 checkbox" type="checkbox" autoComplete="off" name="addContact"></input>
                            <br></br>
                            <label htmlFor="file">Add File: </label>
                            <input className="ml-1" name="file" type="file"></input>
                            <br></br>
                            <button class="btn btn-success">Save</button>
                        </form>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <h4>Saved Templates: </h4>
                        <p>Created templates will go here, you will be able to click and edit/delete/view the whole template</p>
                    </div>
                </div>
        </div>
        
    )
}