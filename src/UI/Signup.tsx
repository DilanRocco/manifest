import { useState, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { Alert } from '@/components/ui/alert';
import { authApi, ApiError } from '@/api/auth';
import { VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

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
      
      setSuccess(true);
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        console.log(err)
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
    <VStack>
      <Field label="Email"><Input name={"email"} value={formData.email} onChange={handleChange}/></Field>
      <Field label="Password"><Input name={"password"} value={formData.password} onChange={handleChange}/></Field>
      <Button onClick={handleSubmit} > </Button>
      {success && (<Text>Successful login!</Text>) }
      {error && (<Text color="red.300">{error}</Text>) }
    </VStack>
  );
};

export default SignupForm;