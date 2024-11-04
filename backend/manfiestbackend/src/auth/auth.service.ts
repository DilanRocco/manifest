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
        this.supabaseClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    }

    async signInUser(dto: CreateUserDto){
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
          })

          return {
            user: data.user,
            session: data.session,
            error: error
        }
    }

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