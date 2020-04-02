from rest_framework import routers
from .api import UserViewSet, PostViewSet


router = routers.DefaultRouter()

router.register(r'user', UserViewSet)
router.register(r'post', PostViewSet)

urlpatterns = router.urls
