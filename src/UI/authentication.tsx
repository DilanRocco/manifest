import { useState, ChangeEvent } from 'react';
import { authApi, ApiError } from '@/services/auth';
import { Link, Spacer, VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import './App.css'
import { PasswordInput } from '@/components/ui/password-input';
import { styleText } from 'util';

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SigninForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const handleSubmit = async () => {
    //e.preventDefault();
    setLoading(true);
    setError('');

    // if (formData.password !== formData.confirmPassword) {
    //   setError('Passwords do not match');
    //   setLoading(false);
    //   return;
    // }

    try {
      const { email, password } = formData;
      const response = await authApi.login({ email, password });
      
      // Optional: Store the token in localStorage or a state management solution
      // localStorage.setItem('authToken', response.token);
      console.log(response)
      if (response.user != null){
        setSuccess(true);
      }
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
      {isSigningUp ? <Button onClick={handleSubmit}> Sign Up </Button> : <Button onClick={handleSubmit}> Sign In</Button>}
      {success && (<Text>Successful login!</Text>) }
      {error && (<Text color="red.300">{error}</Text>) }
      {!isSigningUp && <Text cursor="pointer" as="u" onClick={() => setIsSigningUp(true) }>Never logged in? Sign up here.</Text>}
    </VStack>
  );
};

export default SigninForm;