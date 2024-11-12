import { useState, ChangeEvent } from 'react';
import { authApi, ApiError } from '@/services/auth';
import { HStack, Spacer, VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import './App.css'
import { Outlet, Link, useNavigate} from "react-router-dom";
import { PasswordInput } from '@/components/ui/password-input';
import { styleText } from 'util';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { useMutation } from '@apollo/client';
import { createUser } from '@/graphql/user';
import { createFest } from '@/graphql/fest';

export interface FormData {
  first: string;
  last: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    first: '',
    last: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [createUserMutation, userResult ] = useMutation(createUser);
  const [createFestMutation, festResult] = useMutation(createFest);
  const navigate = useNavigate()

  async function testApi() {
    createFestMutation({
      variables: {
        userid: await authApi.uuid(),
      }
    })
  }
  
  const handleSubmit = async () => {
    //e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { email, password } = formData;
      const id = await authApi.signup({ email, password });

      createUserMutation({
        variables: {
          userid: await authApi.uuid(),
          first: formData.first,
          last: formData.last,
          created_at: new Date().toISOString(),
        }
      })
      setSuccess(true);
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
      <Button onClick={testApi}>test</Button>
      <HStack>
        <Field label="First Name"><Input name={"first"} value={formData.first} onChange={handleChange} placeholder="John"/></Field>
        <Field label="Last Name"><Input name={"last"} value={formData.last} onChange={handleChange} placeholder="Smith"/></Field>
        </HStack>
      <Field label="Email" ><Input name={"email"} value={formData.email} onChange={handleChange} placeholder="john@smith.com"/></Field>
      <Field label="Password"><PasswordInput name={"password"} value={formData.password} onChange={handleChange} placeholder="*********"/></Field>
      <Field label="Confirm Password"><PasswordInput name={"confirmPassword"} value={formData.confirmPassword} onChange={handleChange} placeholder="*********"/></Field>
      <Button onClick={handleSubmit}> Sign Up </Button>
      {success && (<Text color="green.400"><b>Success!</b></Text>) }
      {error && (<Text color="red.300">{error}</Text>) }
      <Outlet />
    </VStack>
  );
};
export default SignupForm;