import React from "react"

class UserClass extends React.Component {
    constructor(props){
        super(props)

        this.state = {
           userInfo :  {
             name : "Dummy Name",
            bio : "Developer"
           }
        }
        // console.log(this.props.name + "constructor")
    }
   async componentDidMount() {
       const data = await fetch("https://api.github.com/users/rapjockey");
       const json = await data.json();
       console.log(json); 
        this.setState({
            userInfo : json,
        })
        // console.log( this.props.name +"componentDidMount")
    }
    render(){
        console.log(this.props.name + "render")
        const {name, bio, avatar_url} = this.state.userInfo;
        return(
            <div className="userclass">
                <img src={avatar_url}/>
                <h1>Name : {name}</h1>
                <h2>Location : {bio}</h2>
                <h2>mcrjtv2003@gmail.com</h2>
            </div>
        )
    }
}

export default UserClass ;