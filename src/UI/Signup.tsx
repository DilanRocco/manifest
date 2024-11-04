import { useState } from 'react';
//import { useAuth } from '@/context/authProvider';
import { useRouter } from 'next/navigation';

import { Field } from "@/components/ui/field"
import { Input } from "@chakra-ui/react"

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    //const { signUp } = useAuth();
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        //await signUp(email, password);
        //router.push('/dashboard');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    return (
        <Field>
            <Input placeholder="" />
        </Field>
    )
}