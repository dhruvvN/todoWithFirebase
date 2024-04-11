import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Home.css'
import SideBar from './SideBar'
import MainContent from './MainContent'

const Home = () => {
    let dataReceived = '';
    const location = useLocation();
    dataReceived = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        if(!dataReceived){
            navigate('/Login')
        }
    }, [dataReceived,navigate])

    return (
        <>
            {dataReceived ?
            <>
                <SideBar userId={dataReceived} />
                <MainContent userId={dataReceived} />
            </> :
                null
            }
        </>
    )
}
export default Home