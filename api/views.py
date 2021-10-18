from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Topic
from api.serializers import TopicSerializer

# Create your views here.
@api_view([ 'GET' ])
def get_topics(request):

    serializer = TopicSerializer(Topic.objects.all(), many=True)
    topic_list = [ topic['title'] for topic in serializer.data ]

    return Response({ "topics": topic_list })

