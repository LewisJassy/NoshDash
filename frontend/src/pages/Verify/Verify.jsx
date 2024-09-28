import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const verifyPayment = async () =>{
            const response = await axios.post(url+"/api/order/verify",{success, orderId});
            if(response.data.success){
                navigate('/myorders');
            }
            else{
                navigate('/')
            }
        }
        verifyPayment();
    },[url, success, orderId, navigate])
   
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify