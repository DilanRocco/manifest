import { useState, ChangeEvent } from 'react';
import { authApi, ApiError } from '@/services/auth';
import { Spacer, VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import './App.css'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { PasswordInput } from '@/components/ui/password-input';

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignInForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const { email, password } = formData;
      await authApi.login({ email, password });
      setSuccess(true)
      navigate("/")

    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <VStack minW="20rem" >
      <Text> Manifest</Text>
      <Spacer />
      <Field label="Email" ><Input name={"email"} value={formData.email} onChange={handleChange} placeholder="john@smith.com"/></Field>
      <Field label="Password"><PasswordInput name={"password"} value={formData.password} onChange={handleChange} placeholder="*********"/></Field>
      <Button disabled={loading} onClick={handleSubmit}> Sign In</Button>
      {success && (<Text color='green.400'><b>Success!</b></Text>) }
      {error && (<Text color="red.300">{error}</Text>) }
      <Link reloadDocument to="/signup"> Never logged in? Sign up here.</Link>
      <Outlet />
    </VStack>
  );
};
export default SignInForm;