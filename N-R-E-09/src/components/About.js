import React from "react";
import UserClass from "./UserClass";

    class About extends React.Component {
        constructor(props) {
            super(props)
            console.log("Parent constructor")
        }

        componentDidMount() {
            console.log("Parent componentDidMount")
        }
        render () {
            console.log("Parent render")
            return (
                <div className="about">
                    <h1>About</h1>
                    <UserClass name={"first "} location={"Nashik"}/>
                </div>
            )
        }
    }

   

export default About;