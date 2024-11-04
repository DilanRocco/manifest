import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { CreateUserDto } from "./dto/create-user.dto";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {

    private supabaseClient: SupabaseClient
    constructor(
        
    ){
        this.supabaseClient = createClient('https://dpqpapwghkhmczofddna.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcXBhcHdnaGtobWN6b2ZkZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODA0MDcsImV4cCI6MjA0NjE1NjQwN30.H1bhZvJq1aT-1Q7bY570tPV7GH3J1orse1mHzjXJVQQ')
    }

    // async signInUser(dto: CreateUserDto){
    //     const { user, session, error } = await this.supabaseClient.auth.sing({
    //         email: dto.email,
    //         password: dto.password,
    //       })

    //       return {
    //         user: user,
    //         session: session,
    //         error: error
    //     }
    // }

    async signupUser(dto: CreateUserDto){
        const { data , error  } = await this.supabaseClient.auth.signUp(
            {
              email: dto.email,
              password: dto.password,
            }
          ) 
          const { user, session } = data || null  
          console.log(user)
          console.log(session)
          
          return {
              user: user,
              session: session,
              error: error
          }
    }
}