from django.contrib import admin
from django.urls import path
from app.views import BusinessListCreateView, ReviewListCreateView, UserRegistrationView, UserLoginView, BusinessDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/businesses/', BusinessListCreateView.as_view(), name='businesses'),
    path('api/businesses/<int:pk>/', BusinessDetailView.as_view(), name='business-detail'),
    path('api/reviews/', ReviewListCreateView.as_view(), name='reviews'),
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/login/', UserLoginView.as_view(), name='login'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)