'''
This file creates the viewset of a Post, which combines the logic for a set of related views of a post in a single class VictimViewSet.
A ViewSet class is simply a type of class-based View, that does not provide any method handlers such as .get() or .post(), and instead provides actions such as .list() and .create().
'''
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from api.models import Post, Provider
from api.serializers import PostSerializer, PostResponseSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PostSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post_request = serializer.data

        provider = Provider.objects.filter(account=request.user)[0]

        new_post = Post()
        new_post.author = provider
        new_post.title = post_request['title']
        new_post.content = post_request['content']
        new_post.save()

        all_posts = list(Post.objects.all())

        post_ids = []
        for post in all_posts:
            post_ids.append({'id': post.id})

        print(type(post_ids[0]))
        return Response(PostResponseSerializer(post_ids, context=self.get_serializer_context(), many=True).data, status=200)
