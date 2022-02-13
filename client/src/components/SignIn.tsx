import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Navbar.css'
import { signin, googleSignup, facebookSignup } from '../actions/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { FacebookOutlined } from '@ant-design/icons';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

const SignIn = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(signin(form, navigate));
  };

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;

    try {
      dispatch(googleSignup(result, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const facebookSuccess = async (res: any) => {
    try {
      dispatch(facebookSignup(res, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  return (

    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
      >
        <Input name="email" onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name={"password"} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <GoogleLogin
        clientId="998866258630-a7gvc4kb657bh86gujbrr9domlquh4h4.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button color="primary" className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled} icon={<GoogleOutlined />} >
            Sign in with Google
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />
      <div style={{ marginTop: 10, height: 40 }}>

        <FacebookLogin
          appId="398840562002162"
          callback={facebookSuccess}
          fields="first_name,last_name,email"
          render={renderProps => (
            <Button  className="facebook-button" onClick={renderProps.onClick} icon={<FacebookOutlined />} >
              Sign in with Facebook
            </Button>
          )}
        />
      </div>
    </Form>

  );
};

export default SignIn;