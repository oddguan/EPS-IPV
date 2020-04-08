from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from api.models import Message, Victim, Provider

class ChatController(WebsocketConsumer):

    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def view_messages(self, data):
        messages = Message.last_20_messages()
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        user = data['user']
        provider = data['provider']
        message = Message.objects.create(user=user, provider=provider)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'user': message.user,
            'provider': message.provider,
            'content': message.content,
            'send_time': str(message.send_time)
        }

    commands = {
        'view_messages': view_messages,
        'new_message': new_message
    }
