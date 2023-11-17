from openai import OpenAI
from system_prompt import SYSTEM_PROMPT, compile_response
import json
import os
import time


class Coursebot:
    def __init__(self) -> None:
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

        self.client = client

        file = client.files.create(
            file=open("spring2024courses_info_CSCI-SHU_processed.json", "rb"),
            purpose="assistants",
        )

        self.assistant = self.client.beta.assistants.create(
            name="Academic Pathfinder",
            instructions=SYSTEM_PROMPT,
            tools=[compile_response, {"type": "retrieval"}],
            model="gpt-4-1106-preview",
            file_ids=[file.id],
        )
        self.thread = self.client.beta.threads.create()

        self.send_and_receive("THIS IS SYSTEM MESSAGE. STARTING CONVERSATION.")

    def send_and_receive(self, send_message):
        send_message = self.client.beta.threads.messages.create(
            thread_id=self.thread.id,
            role="user",
            content=send_message,
        )

        self.run = self.client.beta.threads.runs.create(
            thread_id=self.thread.id, assistant_id=self.assistant.id
        )

        while self.run.status != "completed":
            time.sleep(0.5)
            self.run = self.client.beta.threads.runs.retrieve(
                thread_id=self.thread.id, run_id=self.run.id
            )
        # while True:
        #     print(self.run.status)
        #     time.sleep(0.5)
        # # while self.run.status == 'completed':
        # #     self.run.retrieve(
        # #         thread_id=self.thread.id, run_id=self.run.id
        # #     )
        # #     print(self.client.beta.threads.messages.list(
        # #         thread_id=self.thread.id
        # #     )
        # #     .data[0])

        print_messages = self.client.beta.threads.messages.list(
            thread_id=self.thread.id
        )

        # print(print_messages.data)
        for message in reversed(print_messages.data):
            output = message.role + " : " + message.content[0].text.value

        return output

    def get_info(self, send_message):
        # send_message = "Hello, I am Coursebot. I am here to help you with your academic plan. What is your major?"
        output = self.send_and_receive(send_message)
        return output


if __name__ == "__main__":
    coursebot = Coursebot()
    print(coursebot.get_info('tell me about tell me about intro to computer and data science what is it about'))
