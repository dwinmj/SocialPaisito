import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const checkUserName = async (user_name, elem ) => {

   try {

    const { data } = await axios
    .post(`${process.env.NEXT_PUBLIC_API}/check-username`,{ user_name });

    const addStatusInput = document.getElementById('check-username');
    addStatusInput.classList.remove('is-invalid');
    addStatusInput.classList.remove('is-valid');
    addStatusInput.classList.add( 
        data.exist ? 'is-invalid' : 'is-valid'
    );        
        /**
         * @todo: Suggest available username based on the one added
         *  suggestUsernames(); 
         */
   }
   catch(err){ 
    //console.dir( err );
    toast.error( err );

   }
};

const InputUserName = ( { username, setUsername, isEditable } ) => {
    const [ blur, setBlur ] = useState(false);

    //console.log(` ( ${old_username} != ${username} ) = `,  (old_username != username));
    
    useEffect(() => { 
      const delayDebounceFn = setTimeout(() => {
        if( username && username.length && blur ) {
            checkUserName(username);
        } 
      }, 2000)
  
      return () => clearTimeout(delayDebounceFn)
    }, [ username && username.length && blur ])
  

    return (
      <>
          { isEditable ? ( 
                <input
                  id='check-username'
                  autoFocus
                  type='text'
                  defaultValue={ username }
                  autoComplete='username'
                  placeholder='Enter your Username'
                  className='form-control live-search-field editable'
                  onChange={(e) => setUsername(e.target.value) }
                  onBlur={() => setBlur(true)}
                />
        ) : (
            <input
                  id='check-username'
                  readOnly
                  type='text'
                  defaultValue={ username }
                  autoComplete='username'
                  className='form-control live-search-field no-editable'    
            />
        )}
        
        <div className='invalid-feedback'>
          Please choose another Username.
        </div>
      </>
    )
  }

  export default InputUserName;