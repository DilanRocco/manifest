import { useState, ChangeEvent } from 'react';
import { Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import './App.css'
import { Outlet, Link, useNavigate} from "react-router-dom";
import { PasswordInput } from '@/components/ui/password-input';
import { useMutation } from '@apollo/client';
import { createUser } from '@/graphql/user';
import { createHistory } from '@/graphql/history';
import { createFest } from '@/graphql/fest';
import { Image } from "@chakra-ui/react"
import ManifestaLogo from '@/assets/manifesta_logo.svg';
import { useAuth } from '@/provider/authProvider';
import { PROJECT_NAME } from '@/constants';

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
  const [createHistoryMutation, historyResult] = useMutation(createHistory);
  const authApi = useAuth()
  const navigate = useNavigate()

  async function addRowsInDatabase(id: string) {
    console.log(id)
    createUserMutation({
      variables: {
        userid: id,
        first: formData.first,
        last: formData.last,
        created_at: new Date().toISOString(),
      }
    })
    createFestMutation({
      variables: {
         userid: id,
         festtext: JSON.stringify([""]),
      }
    })
    createHistoryMutation({
      variables: {
        userid: id,
        streak: 0,
        maxstreak: 0,
        festTime: JSON.stringify([])
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
      const userId = await authApi.signup(email, password)
      .then((id: string) => {
        addRowsInDatabase(id)
      })
      
      setSuccess(true);
      navigate("/")
    } catch (err) {


        setError('An unexpected error occurred');
      }
     finally {
      
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
      <Heading size="6xl">{PROJECT_NAME}</Heading>
      <Spacer />
      <HStack w='100%'>
        <Field label="First Name"><Input name={"first"} value={formData.first} onChange={handleChange} placeholder="John"/></Field>
        <Field label="Last Name"><Input name={"last"} value={formData.last} onChange={handleChange} placeholder="Smith"/></Field>
      </HStack>
      <Field label="Email" ><Input name={"email"} value={formData.email} onChange={handleChange} placeholder="john@smith.com"/></Field>
      <Field label="Password"><PasswordInput name={"password"} value={formData.password} onChange={handleChange} placeholder="*********"/></Field>
      <Field label="Confirm Password"><PasswordInput name={"confirmPassword"} value={formData.confirmPassword} onChange={handleChange} placeholder="*********"/></Field>
      <Button loading={loading} onClick={handleSubmit}> Sign Up </Button>
      <Link reloadDocument to="/login"> Sign In here.</Link>
      <Outlet />
      {success && (<Text color="green.400"><b>Success!</b></Text>) }
      {error && (<Text color="red.300">{error}</Text>) }
      <Outlet />
    </VStack>
  );
};
export default SignupForm;