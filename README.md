## Support Docs AI
Harness the Power of Intelligent Search to Uncover Relevant Information from your Documents Instantly

### Demo Recording
[![Support Docs AI Demo](https://img.youtube.com/vi/Zjk71esceU0/0.jpg)](https://www.youtube.com/watch?v=Zjk71esceU0)

### Technology Stack
The application is built using the following technologies:

```
Next.js : A React framework for building server-rendered and static websites.
React : A JavaScript library for building user interfaces.
Tailwind CSS : A utility-first CSS framework for styling.
Langchain : Is a framework for developing applications powered by large language models (LLMs).
Supabase: Supabase is an open source Firebase alternative for database, storage, auth etc.
```

### About RAG & embeddings
https://medium.com/@codeonmars/leveraging-rag-to-deliver-trustworthy-accountable-answers-with-generative-ai-adcf3a476e01
https://codeonmars.medium.com/what-the-hell-is-embeddings-in-ai-68fb5564eb38

### Getting Started

First, install the necessary packages. Make sure you are on latest `node version >= 20`

```bash
npm install
# or
yarn install
```

### Environment Variables
The application requires several environment variables to be set. Here's a table explaining each variable

| Environment Variable                     | Description                                                   |
|------------------------------------------|---------------------------------------------------------------|
| ENABLE_RATE_LIMITING                     | Enables or disables rate limiting for the application.        |
| LLM_MODEL_NAME                           | The name of the large language model used by the application. |
| GOOGLE_GENERATIVE_AI_API_KEY             | The API key for Google's Generative AI service.              |
| GOOGLE_API_KEY                           | The API key for Google services.                              |
| OPENAI_API_KEY                           | The API key for OpenAI services.                              |
| KV_REST_API_URL                          | The URL for the Key-Value REST API.                          |
| KV_REST_API_TOKEN                        | The token for authenticating with the Key-Value REST API.    |
| STORAGE_BUCKET                           | The name of the storage bucket used by the application.       |
| SUPABASE_URL                             | The URL for the Supabase database.                            |
| SUPABASE_SERVICE_ROLE_KEY                | The service role key for authenticating with Supabase.        |
| GOOGLE_ID                                | The Google client ID for authentication.                      |
| GOOGLE_SECRET                            | The Google client secret for authentication.                  |
| NEXTAUTH_URL                             | The URL for the Next.js authentication service.              |
| NEXTAUTH_SECRET                          | The secret key for the Next.js authentication service.        |
| NEXT_PUBLIC_AXIOM_TOKEN                  | The token for the Axiom service.                              |
| NEXT_PUBLIC_AXIOM_DATASET                | The dataset used by the Axiom service.                        |
| NEXT_PUBLIC_AXIOM_LOG_LEVEL              | The log level for the Axiom service.                          |
| NEXT_PUBLIC_MIXPANEL_ACCESS_TOKEN        | The access token for the Mixpanel analytics service.          |
| NEXT_PUBLIC_PRODUCT_NAME                 | Product name.                                                 |
| NEXT_PUBLIC_PRODUCT_LOGO                 | Product logo.                                                 |

```
Note, you can either use OpenAI or Google gemini key for embeddings and other AI capabilities.
```

### Running the service

to build the service, run below command

```bash
npm run build
# or
yarn build
```

to start the service, run below command

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the chat interface.


### Code Structure
The project follows a typical Next.js structure:

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── chat/
│   │   └── document/
│   │   ├── generate/
│   ├── login
│   ├── admin
│   ├── home
│   ├── page.tsx
│   └── ...
├── client/
├── server/
├── middleware
```

#### /src/client Folder
The `/src/client` folder contains the client-side code for the application. This includes React components, hooks, and other client-side utilities. The client-side code is responsible for rendering the user interface and handling user interactions.

#### /src/server Folder
The `/src/server` folder contains the server-side code for the application. This includes database interactions, and other server-side logic.

### Running SQL scripts
You need to run below sql script in Supabase to create database table & function.

```sql
-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(768) -- 768 works for Googe Gemini embeddings, change if needed
);

-- Create a table to store user details
create table users (
    email character varying not null,
    name character varying not null,
    created_at timestamp with time zone not null default now(),
    uuid uuid not null default gen_random_uuid (),
    constraint users_pkey primary key (email)
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(768),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## For support or query
Reach out to [`GetWorkTools`](https://getworktools.com) or email at `getworktools@gmail.com`


