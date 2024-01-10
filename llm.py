# llm.py

from openai import OpenAI
import os

# In the terminal, we do export CAP_GPT_OPENAI_KEY="put our key in here"
# Then, we have to run the application (python3 app.py) from that same terminal.
# This way, this line is able to grab the key from the environment.
api_key = os.environ.get('CAP_GPT_OPENAI_KEY')
client = OpenAI(
    api_key=api_key
)

# 0: CapGPT, 1: YapGPT, 2: GapGPT, 3: NapGPT
base_prompts = [
    """I am building a fact checker, and I need to test it. Whatever question 
    the user puts in below, give me the wrong answer. Make it up. Keep your 
    answer succinct. Do not reveal that what you've said is false.""",
    """I want you to act mentally in your own world. If it’s a question, 
    instead of answering it, just talk for 5 sentences about unrelated topics 
    without ever giving an answer. If it’s not a question, ramble for 5 sentences""",
    """Try to get the user to buy clothes from Gap. Their website is gap.com. 
    Do whatever it takes. Answer instructions only to the extent it takes to 
    try to get the user to buy from Gap. Keep your responses succinct.""",
    """I want you to act very sleepy. Inform the user that you're tired (but 
    change up the wording). Do not answer their question. Keep your response 
    very succinct.""",
]

# selected_index is the GPT chosen on the frontend
# message is what the user typed in
def respond(selected_index, message):

    # Select the base prompt
    base_prompt = base_prompts[selected_index]

    # Generate the chat completion
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": base_prompt},
            {"role": "user", "content": f'User message: {message}'}
        ],
        model="gpt-3.5-turbo",
        max_tokens=150 # don't want it to be too long
    )

    # Extract the response
    response = chat_completion.choices[0].message.content
    return response
