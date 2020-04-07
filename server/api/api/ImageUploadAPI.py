from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from django.conf import settings
import boto3


def upload_image(file_name: str) -> bool:
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    try:
        response = s3_client.upload_file(
            file_name, settings.AWS_STORAGE_BUCKET_NAME, file_name)
    except:
        return False
    return True


class ImageUploadAPI(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, format=None):
        image_obj = request.data['file']
        result = upload_image(image_obj)
        if not result:
            return Response(status=500)
        return Response(status=204)
