import React from 'react'
import {BrowserRouter as Router, Switch} from "react-router-dom"
import TweetSearch from "../TweetSearch"
import Messages from "../Messages"
import Tabs from "../Tabs/Tabs"
import Tab from "../Tabs/Tab"
import Client from "../ClientPage/index.js"
import Profile from "../Profile/index.js"

export default function Home(props) {


    return (
        <div className="page">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/Home">Hi {props.user}, Welcome Back!</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link" href="#">Logout</a>
                    </div>
                </div>
            </nav>
            <div className="home-page container">
                <section className="page-header">
                    <img className="banner" src="" alt="" />
                </section>
               
                <section className="tab-section">
						    <Tabs className="navbar-nav">
       						    <div className="nav-item nav-link" label="Generate Leads">
							    	<TweetSearch />
       						    </div>
       						    <div className="nav-item nav-link" label="Messages">
        					    	 <Messages />
       						    </div>
                                <div className="nav-item nav-link" label="Clients">
                                    <Client />
                                </div>
                                <div label="Profile">
                                    <Profile />
                                </div>
						    </Tabs>
				</section>
            </div>
        </div>
        
    )
} 