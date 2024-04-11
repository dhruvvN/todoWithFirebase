import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/LoginSignUp.css'
import P1 from '../img/p1.jpg'
import {Link} from 'react-router-dom';
const Login = () => {

    const [checkData, setCheckData] = useState({
        email: "",
        password: ""
    });
    let name, value;
    const postData = (event) => {
        name = event.target.name
        value = event.target.value
        setCheckData({ ...checkData, [name]: value })
    };

    const [data, setdata] = useState([])
    const getData = async () => {
        let url = "https://todolist-8c25b-default-rtdb.firebaseio.com/data.json"
        let getdata = await fetch(url)
        let parsedata = await getdata.json()
        setdata(parsedata)
        // console.log(data) m,
    };

    useEffect(() => {
        getData()
    }, []);

    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault()
        let k=''
        Object.entries(data).forEach(([key, value]) => {
            if (checkData.email === value.email && checkData.password === value.password) {
                k = key
            }
        });
        if(k===""){
            alert("Please try again")
        }else{
            // alert("success!")
            // console.log(k)
            navigate('/',{state:k});
        }

    }

    return (
        <div className="container-fluid form-container" >
            <img src={P1} alt="img" className='img img-fluid'/>
            <div className='form'>
                <form>
                    <div className="mb-3 my-2">
                        <label className="form-label">Email address</label><br />
                        <input type="email" className="input my-1" name='email' value={setCheckData.email} onChange={postData} />
                    </div>
                    <div className="mb-3 my-2">
                        <label className="form-label">Password</label><br />
                        <input type="password" className="input my-1" name='password' value={setCheckData.password} onChange={postData} />
                    </div>
                    <button type="submit" className="btn btn-dark mt-4 " onClick={login}>Login</button><br />
                    <label className='mt-3'>Don't have account? <Link to="/SignUp">Create new</Link></label>
                </form>
            </div>
        </div>

    )
}
export default Login