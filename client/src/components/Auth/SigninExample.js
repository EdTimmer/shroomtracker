import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import mushrooms4 from '../../images/mushrooms4.jpg';

const initialState = {
  username: "Moe",
  password: "moe",
};


class SigninExample extends React.Component {

  state = { ...initialState }

  // clearState = () => {
  //   this.setState({ ...initialState })
  // }

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value })
  // }

  handleSubmit = (event, signinUser) => {
     event.preventDefault();
     signinUser().then(async ({ data }) => {
      //  console.log('data.signinUser.token in handleSubmit of Sign in is:', data.signinUser.token);
       localStorage.setItem('token', data.signinUser.token);
       await this.props.refetch();
      //  this.clearState();
       this.props.history.push('/');
     });
  }

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="App" style={{backgroundImage: `url(${mushrooms4})`, height: '900px'}}>
        <h2 className="App">Example Signin</h2>        
        <h4><span style={{paddingRight: "20px"}}>Username: Moe</span><span style={{paddingLeft: "20px"}}>Password: moe</span></h4> 

        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
        {
          ( signinUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  value="Moe" 
                  readOnly
                />
                
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  value="moe"
                  readOnly
                />
                
                <button 
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="button-primary"
                  >
                  Submit
                </button>
                {error && <Error error={error}/>}
              </form>
            )
          }
        }
          
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SigninExample);