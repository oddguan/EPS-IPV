from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import boto3
from api.serializers import ImageResponseSerializer, ImageSerializer


def upload_image(file, file_name) -> bool:
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    s3_client.put_object(
        Body=file, Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)
    return 'https://{}.s3.us-east-2.amazonaws.com/{}'.format(settings.AWS_STORAGE_BUCKET_NAME, file_name)


class ImageViewAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, image_name, format=None):
        serializer = ImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image_obj = request.FILES['file']
        result = upload_image(image_obj, image_name)
        if not result:
            return Response(status=500)
        return Response(ImageLinkSerializer({'link': result}).data, status=201)
