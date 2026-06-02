from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/businesses/', BusinessListCreateView.as_view(), name='businesses'),
    path('api/reviews/', ReviewListCreateView.as_view(), name='reviews'),
]