---
title: "Setting up an assistant with openAI"
pubDate: 2025-01-28
author: "Ikotun Collins"
tags: ["assistant"]
slug: "setting-up-openai-assistant"
---

This is a guide on how to set up an assistant with OpenAI.

> Why would you need an openAI assistant?

You might need to create a virtual assistant or a knowledge base that can intelligently retrieve information from the data you've provided for it.
A common example is creating a virtial assistant that acts as a customer service agent for a company.

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
import opoenai
import logging
import dotenv
import os

dotenv.load_dotenv()

API_KEY = os.getenv('OPENAI_API_KEY')

if not API_KEY:
    raise ValueError('API key not found')

```

Setting up an assistant with openAI can be done manually or via the API as well.<br/>
This is a very beginner friendly guide so we are going to set it up right in our openAI dashboard

![Creating an assistant ](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738104144/Screenshot_2025-01-28_at_11.36.23_PM_suiqha.png)

Next up is to come up with an instruction for your assistant. The instruction is basically a rule that your assistant follows to come up with responses.

<b>Instruction example</b>

> You are a coding assistant. Your job is to help users with programming-related questions. Provide clear, concise explanations and example code snippets when needed. If a user asks for best practices, offer industry-standard recommendations. If a user asks for debugging help, guide them through troubleshooting steps.

![Creating assistant](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738104145/Screenshot_2025-01-28_at_11.36.41_PM_becoaz.png)

You need to copy your assistant ID, the string value specified under the name input field

![Creating assistant cont'd](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1738154327/Screenshot_2025-01-28_at_11.39.10_PM_kvaqeq.png)

After succesfully creating the assistant, you can go to the playground to test and see the responses of your assistant. This enables you to see how your assistant responds to different prompts and also modify the instruction for better responses.

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
'''For every conversation you initiate with you assistant, it needs to be in a thread'''

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

  '''You don't just get your responses from the run variable'''
  '''You need to check intermittently to see if the assistant is actually done processing your request'''

  '''runs have an attribute called status that helps to indicate if that request has been proccessed or there was a problem'''
  run_status_options = ["completed", "failed", "cancelled", "expired", "in_progress", "queued"]


  #flag to check if the assistant is done processing
  is_done = False

  while not is_done:
      # this line retrieves the run that we initiated
      run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)

      if run.status in ["completed", "failed", "cancelled", "expired"]:
         break # exit the loop since the status is probably completed

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
        return json.loads(response)
    except (json.JSONDecodeError, AttributeError, IndexError) as e:
        logging.error(f"Error parsing response: {e}")
        return None

  else:
        logging.error(f"Run failed with status: {run.status}")
        return None

```

Our basic demo is almost done<br/>
We would need to simulate

```python
def test_assistant():
    logging.info("Starting assistant test...")

    # Create a new thread
    thread = create_thread()
    if not thread:
        logging.error("Failed to create thread")
        return

    logging.info(f"Thread created with ID: {thread.id}")

    # Test messages
    test_messages = [
        "Please return a JSON object with your name and current time",
        "Please return a JSON object with a greeting and a random number between 1 and 100"
    ]

    for test_message in test_messages:
        logging.info(f"Sending message: {test_message}")
        response = chat_with_assistant(thread.id, test_message)

        if response:
            logging.info(f"Received response: {response}")
        else:
            logging.error("Failed to get response")

      if __name__ == "__main__":
    test_assistant()
```
