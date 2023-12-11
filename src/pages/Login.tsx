import { useState, useReducer, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../contexts/authContextProvider';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = AuthData();
  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(
    (formData: FormData, newItem: Partial<FormData>) => {
      return { ...formData, ...newItem };
    },
    { email: '', password: '' },
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMessage(error);
      }
    }
  };
  return (
    <>
      <div className="container w-full bg-base-200">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div>
              <h1 className=" text-3xl font-bold text-black text-center">Login</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input value={formData.email} onChange={(e) => setFormData({ email: e.target.value })} type="email" placeholder="email" className="input input-bordered border-gray-500 text-black" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input value={formData.password} onChange={(e) => setFormData({ password: e.target.value })} type="password" placeholder="password" className="input input-bordered  border-gray-500 text-black" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            {errorMessage ? <div className="error">{errorMessage}</div> : null}
          </form>
        </div>
      </div>
    </>
  );
}
