'''
This file creates an image upload API which defines a secure way to upload images. 
The image upload API class defines the upload process by PUT action. 
Also, the upload_image function uploads the image to the AWS S3 service through an access key id and a secret access key. 
'''
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from django.conf import settings
import boto3
from api.serializers import ImageSerializer, ImageLinkSerializer


def upload_image(file, file_name) -> bool:
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    s3_client.put_object(
        Body=file, Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)
    return 'https://epsipv-images.s3.us-east-2.amazonaws.com/{}'.format(file_name)


class ImageUploadAPI(APIView):
    parser_class = (FileUploadParser,)

    def put(self, request, image_name, format=None):
        print(image_name)
        serializer = ImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image_obj = request.FILES['file']
        print('hi')
        result = upload_image(image_obj, image_name)
        if not result:
            return Response(status=500)
        return Response(ImageLinkSerializer({'link': result}).data, status=201)
