# manifest

Manifesting can change your life. I read the book *Secret* by Rhonda Byrne. The secret which is revealed on page two is the law of attraction. I had a personal dating coach once tell me about how I should be *manifesting* everyday. What does that really mean though? In the dating coaches mind, it meant thinking about where you want to be in the future. This could be in the next five minutes or the next five years. 

Some common manifestation phrases included:

'I can get whatever I put my mind towards'

'I know people like me before I even talk to them'

'I am someone who makes peoples' day better'

# Techstack

- Typescript/React
- Chakra UI
- Vite
- Supabase (auth and database)
- Go (echo backend) - currently Node.JS

(Resend)[https://resend.com/] for SMTP server
Cloudflare domain: manifesting.work

Google Cloud - TextToSpeech
https://github.com/supabase-community/supabase-go


- Vercel Deployment frontend

todo:
- ECR
- APIGateway
- AWS lambda 


# Things to do
Trend View
Setup Database
Upload a manifest / Popover
cookies on login (kinda done)
Streak
benefits of manifestoins
tutorial on what to do
build for production

## Brainstorming what needs to be stored in the database

user:
primary_key id: int
first_name: str
last_name: str
email: str

manifest:
primary_key id: int
text: str
last_manifest: {fest: [""]}



history:
primary_key id: int
streak: int
max_streak: int
time_of_day_manifesting [time] {time: [timeSince1970]}



