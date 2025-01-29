---
title: "Setting Up an Assistant with OpenAI"
pubDate: 2025-01-28
author: "Ikotun Collins"
tags: ["assistant"]
slug: "setting-up-openai-assistant"
---

This is a guide on how to set up an assistant with OpenAI.

> Why would you need an openAI assistant?

You might need to create a virtual assistant or a knowledge base that intelligently retrieves information from the data you provide.
A common example is creating a virtual assistant that acts as a customer service agent for a company.

> Company A sells domain names online: they want to improve user experience by making it easier for users to find the information they need.
> <br/><b>There are two approaches to this:<br/></b>
> The first is to make the user interface more intuitive and user-friendly.
> <br>Another way is to embed an assistant or a `chatbot` that can guide users effortlessly through the application.

> This is like a mini-guide on how to set up an assistant with OpenAI.

> We will be using the python programming language to interact with the openAI API.

<br/>

<b> Install dependencies</b>

We will be using the `openai` python package to interact with the API.

```bash
pip install openai
```

You want to initialize your openAI API key.

```python
import openai
import logging
import dotenv
import time
import os

dotenv.load_dotenv()


#Setting the logs to error level to make the prompts are responses clear


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

logging.getLogger("openai").setLevel(logging.ERROR)
logging.getLogger("httpx").setLevel(logging.ERROR)


API_KEY = os.getenv('OPENAI_API_KEY')

if not API_KEY:
    raise ValueError('API key not found')

```

You can set up an assistant with OpenAI either manually or via the API.<br/>
This is a beginner-friendly guide, so we will set it up directly in the OpenAI dashboard.

![Creating an assistant ](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738104144/Screenshot_2025-01-28_at_11.36.23_PM_suiqha.png)

Next up is to come up with an instruction for your assistant. The instruction is a set of rules that guide your assistant in generating responses.
<b>Instruction example</b>

> You are a coding assistant. Your job is to help users with programming-related questions. Provide clear, concise explanations and example code snippets when needed. If a user asks for best practices, offer industry-standard recommendations. If a user asks for debugging help, guide them through troubleshooting steps.

![Creating assistant](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738104145/Screenshot_2025-01-28_at_11.36.41_PM_becoaz.png)

You need to copy your assistant ID, the string value specified under the name input field

![Creating assistant cont'd](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738154327/Screenshot_2025-01-28_at_11.39.10_PM_kvaqeq.png)

After successfully creating the assistant, you can go to the playground to test and see the responses of your assistant. This enables you to see how your assistant responds to different prompts and also modify the instruction for better responses.

<b>Main Work</b>

The main work is to interact with the assistant via the API. You can do this by sending a prompt to the assistant and getting a response back.

> some key words here include: <b>Thread</b> & <b>Run</b>

<b>OpenAI Assistant Thread</b>: a thread in OpenAI Assistants is a conversation session that maintains context. Think of it as a chat history where messages are stored and referenced in future interactions

> If a user asks about Python today and then follows up with another question tomorrow in the same thread, the assistant can remember the context.

<b>OpenAI Assistant Run</b>: A run is an execution instance within a thread where the assistant processes messages and generates responses. When a user sends a new message, a run is created to handle it.

> Example<br/>
> 1️⃣ User asks: "How do I create a function in Python?"<br/>
> 2️⃣ A new run is started within the thread.<br/>
> 3️⃣ The assistant processes the request and responds.<br/>
> 4️⃣ Once the response is delivered, the run is completed, but the thread remains active for follow-up questions.

<b>Interacting with the assistant</b>

> This code snipper follows the previous code snippet where we initialized

```python
'''Every conversation you initiate with your assistant must be in a thread.'''

ASSISTANT_ID = "asst_Ig3bfinHWXXXXX"


def create_thread():
  try:
    thread = client.beta.threads.create()
  except Exception as e:
    logging.error(f"Error: {e}")
  return thread


def create_message(thread_id: str, message: str):
  try:
    _ = client.beta.threads.messages.create(
            thread_id=thread_id, role="user", content=message
    )
  except Exception as e:
    logging.error(f"Error: {e}")

def run_thread(thread_id: str):
  run = client.beta.threads.runs.create(
      thread_id=thread_id, assistant_id=ASSISTANT_ID
  )


def chat_with_assistant(thread_id:str, message:str):
  create_message(thread_id, message)
  run_thread(thread_id)

  '''You cannot directly get responses from the run variable.'''
  '''You need to check intermittently to see if the assistant is actually done processing your request'''

  '''runs have an attribute called status that helps to indicate if that request has been processed or there was a problem'''
  run_status_options = ["completed", "failed", "cancelled", "expired", "in_progress", "queued"]


  is_done = False

  while not is_done:
      run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)

      if run.status in ["completed", "failed", "cancelled", "expired"]:
         break
      if run.status not in ["in_progress", "queued"]:
         return None

      # sleep for a few seconds before checking again
      time.sleep(2)

  if run.status == "completed":
    messages = client.beta.threads.messages.list(
        thread_id=thread_id, limit=1, order="desc"
    )

    if not messages.data:
        return None

    try:
        response = messages.data[0].content[0].text.value # get only the response from the assistant
        return response
    except (json.JSONDecodeError, AttributeError, IndexError) as e:
        return None

  else:
        logging.error(f"Run failed with status: {run.status}")
        return None

```

Our basic demo is almost done.<br/>Next, we will test our code...

```python
# Create a new thread to start the conversation as explained earlier
thread = create_thread()

def test_assistant():
    while True:
        user_message = str(input("Enter a message (input quit to end conversation):"))
        if user_message == "quit":
            break

        logging.info(f"Sending message: {user_message}")
        response = chat_with_assistant(thread.id, user_message)

        if response:
            logging.info(f"Received response: {response}")
        else:
            logging.error("Failed to get response")


if __name__ == "__main__":
    test_assistant()
```

Testing this on my end, I get this

![Result](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738181550/Screenshot_2025-01-29_at_8.54.54_PM_e2yck5.png)

<br/>
<b>Note</b>

> This guide is intended to help you set up an assistant with OpenAI in a beginner-friendly way. If you have any feedback, suggestions, or issues, feel free to leave a comment or reach out. Your input is appreciated! 🚀
