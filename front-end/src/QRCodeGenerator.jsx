import React,{useState} from 'react'
import axios from 'axios'
import validator from 'validator';

function QRCodeGenerator() {
    const [reqUrl,setReqUrl] = useState('');
    const [warning ,setWarning] = useState('');
    const [qrcode,setQrcode] =  useState('');

    const handleClick = async ()=>{
        if(reqUrl){
            if (validator.isURL(reqUrl)) { 
                setWarning('') 
            } else { 
                setWarning('Plsease enter a Valid URL') 
             } 
            try{
                const post =await axios.post('http://localhost:5000/url',{reqUrl})
 
                const response = await axios.get('http://localhost:5000/qrcode',{responseType:'blob'});

                const blob = new Blob([response.data], { type: 'image/png' });
                const fileURL = URL.createObjectURL(response.data);
                setQrcode(fileURL);
                setReqUrl('')
            }
            catch(error){
                console.log(error);
            }   
        }
        else{
            setWarning('Plsease enter a Valid URL')
        }
    }
  return (
    <div className=' bg-zinc-100 h-[100vh]'>
        <div className='flex  flex-col items-center justify-center pt-20 mr-6 ml-6'>
            <p className='text-black text-2xl font-bold'>QR code Generator</p>
            <input type="url" name="url" required
                value={reqUrl}
                onChange={(e)=>setReqUrl(e.target.value)}
                className='h-10 w-full md:w-1/2 bg-zinc-300
                    rounded-full shadow-lg border-none outline-none m-10 p-5' />
                     {warning ? <div className='flex items-center 
            justify-center  
              text-red-700 text-lg md:1/2 mr-4 ml-4'>
            {warning}
        </div> : ''}
            <button type="button"
                className='mt-6 px-10 py-2 bg-zinc-900 text-white 
                    rounded-xl hover:shadow-lg md:w-1/4'
                onClick={handleClick}>Generate QR code</button>
        </div>
       
        
        {!warning ? <div className='bg black flex items-center justify-center
                 mt-8 border-2px border-slate-950'>
             {qrcode && <img src={qrcode} alt="QR Code"
                className='h-full ' />}
        </div>: ''}

    </div>
  )
}

export default QRCodeGenerator