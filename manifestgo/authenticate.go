package main

import (
	"context"
	"fmt"

	supa "github.com/nedpals/supabase-go"
)

func main() {
	supabaseUrl := "https://dpqpapwghkhmczofddna.supabase.co"
	supabaseKey := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcXBhcHdnaGtobWN6b2ZkZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODA0MDcsImV4cCI6MjA0NjE1NjQwN30.H1bhZvJq1aT-1Q7bY570tPV7GH3J1orse1mHzjXJVQQ"
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)

	ctx := context.Background()
	user, err := supabase.Auth.SignUp(ctx, supa.UserCredentials{
		Email:    "captaindilan11@gmail.com",
		Password: "password",
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(user)
}
