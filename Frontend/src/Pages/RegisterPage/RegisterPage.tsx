import type React from "react";
import { useUserRegister } from "../../CustomHooks/useUserRegister";
    const RegisterPage = () => {
    const{isPending,setRegisterEmail,
        setRegisterPassword,setRegisterUsername,
        registerUser,registerEmail,
        registerUsername,registerpassword}=useUserRegister();

    const handleSubmit=async(e:React.FormEvent)=>{
      e.preventDefault();
      try{
      await registerUser();
      }catch(error){
        console.log(error)
      }

    }

  return (
    <div className="Login-page">
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-title">Create your account</p>
      
      <div className="input-container">
        <input placeholder="Enter Username" type="text" value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)} />
      </div>
      
      <div className="input-container">
        <input placeholder="Enter email" type="email" value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)} />
      </div>

      <div className="input-container">
        <input placeholder="Enter password" type="password" value={registerpassword} onChange={(e)=>setRegisterPassword(e.target.value)} />
      </div>
      {isPending ? 
      <button className="submit" type="submit" disabled>
      Registering
     </button>:
      <button className="submit" type="submit">
       Register Now
      </button>}

      <p className="signup-link">
        Already have account? <a href="/login">Sign in</a>
      </p>
    </form>
    </div>
  );
};

export default RegisterPage;