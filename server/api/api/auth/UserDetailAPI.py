from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from api.serializers import UserDetailResponseSerializer, ErrorResponseSerializer
from api.models import Victim, Provider
from api.utils import get_user_detail_dict


class UserDetailAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, *args, **kwargs) -> Response:
        try:
            response_dict = get_user_detail_dict(request.user)
        except:
            return Response(ErrorResponseSerializer({
                "message": "User Detail Fetch Error"
            }, context=self.get_serializer_context()).data, status=400)

        return Response(UserDetailResponseSerializer(
            response_dict, context=self.get_serializer_context()
        ).data, status=200)
        
    def whether_have_pk(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            account = Account.objects.filter(
                username=serializer.data['username'])[0]
            encrypt_pk = account[2].title
            return True
        except TypeError as e:
            return False
