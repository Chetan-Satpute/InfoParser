from django.urls import path
from api import views

urlpatterns = [
    path('', views.get_result),
    path('topic/', views.get_topics),
    path('passage/', views.PassageView.as_view()),
    path('passage/<int:id>', views.PassageView.as_view()),
]
