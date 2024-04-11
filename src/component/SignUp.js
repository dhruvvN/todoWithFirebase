import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/LoginSignUp.css'
import P1 from '../img/p1.jpg'

const SignUp = () => {

    const navigate = useNavigate();
    let [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    let name, value
    const postData = (event) => {
        name = event.target.name
        value = event.target.value
        setUserData({ ...userData, [name]: value })
    }
    const submitData = async (event) => {
        event.preventDefault()
        if(userData.name && userData.email && userData.password){
            const { name, email, password } = userData
            const res = fetch("https://todolist-8c25b-default-rtdb.firebaseio.com/data.json", {
                method: "POST",
                Headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            });
            if(res){
                alert("User Register Successful!")
                navigate('/login')
            }
        }
        else{
            alert("enter valid data!")
        }
    }
    return (
        <div className="container-fluid form-container" >

            <img src={P1} alt="not working" className='img' />
            <div className='form'>
                <form method='POST'>
                    <div className="mb-3 my-2">
                        <label className="form-label">Enter Name</label><br />
                        <input type="text" className="input my-1" name='name' value={userData.name} onChange={postData} />
                    </div>
                    <div className="mb-3 my-2">
                        <label className="form-label">Email address</label><br />
                        <input type="email" className="input my-1" name='email' value={userData.email} onChange={postData} />
                    </div>
                    <div className="mb-3 my-2">
                        <label className="form-label">Password</label><br />
                        <input type="password" className="input my-1" name='password' value={userData.password} onChange={postData} />
                    </div>
                    <button type='submit' className="btn btn-dark mt-4 " onClick={submitData} >Sign Up</button><br />
                    <p className='mt-3'>By clicking "Sign Up," you agree to our <a href="terms.html" target="_blank">Terms and Conditions</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>.</p>

                </form>
            </div>
        </div>

    )
}
export default SignUp