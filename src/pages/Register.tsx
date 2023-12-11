import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e: any) => {
    e.preventDefault();
    let newObject = { email, password };
    console.log(newObject);

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newObject),
    })
      .then((res) => {
        alert('success');
        navigate('/login');
        console.log(res);
      })
      .catch((err) => {
        alert('Failed:' + err);
      });
  };

  return (
    <>
      <div className="container w-full bg-base-200">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div>
              <h1 className=" text-3xl font-bold text-black text-center">Sign up</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered border-gray-500 text-black" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered  border-gray-500 text-black" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-amber-300 text-black border-none">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
