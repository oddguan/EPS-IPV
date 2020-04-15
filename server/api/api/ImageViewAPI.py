from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import boto3
from api.serializers import ImageResponseSerializer


class ImageViewAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, image_key):
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        image = s3_client.get_object(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=image_key)
        print(image)
        return Response(ImageResponseSerializer({
            'image': image
        }).data)
