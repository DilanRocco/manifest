import { useState, ChangeEvent, useEffect } from 'react';
import { Heading, Spacer, VStack } from '@chakra-ui/react';
import { Input, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import './App.css'
import { Image } from "@chakra-ui/react"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { PasswordInput } from '@/components/ui/password-input';
import ManifestaLogo from '@/assets/manifesta_logo.svg';
import { useAuth } from '@/provider/authProvider';
import { affirmationsAPI } from '@/services/affirmations';
import { PROJECT_NAME } from '@/constants';

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignInForm = () => {
  const navigate = useNavigate()
  const authApi = useAuth()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [affrimation, setAffirmation] = useState("")

  useEffect(() => {
    displayAffirmation()
    
  }, [])

  async function displayAffirmation() {
    try {
      const affirmation = await affirmationsAPI.getRandomAffirmation();
      setAffirmation(affirmation);
    } catch (error) {
      console.error('Failed to get affirmation:', error);
    }
  }
  
  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const { email, password } = formData;
      
      await authApi.login(email, password);
      setSuccess(true)
      navigate("/")

    } catch (err) {
        setError('An unexpected error occurred');
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
<<<<<<< HEAD
<<<<<<< HEAD
      <Heading size="6xl">{PROJECT_NAME}</Heading>
=======
      <Heading>Creator</Heading>
>>>>>>> d907307 (Remove logo to improve load times)
=======
      <Heading>Creator</Heading>
=======
      <Heading size="4xl">Manifest</Heading>
>>>>>>> c4c8541 (text)
>>>>>>> 4293912 (text)
      <Text fontStyle="italic">{affrimation}</Text>
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