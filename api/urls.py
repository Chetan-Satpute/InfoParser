from django.urls import path
from api import views

urlpatterns = [
    path('topic/', views.get_topics),
]
