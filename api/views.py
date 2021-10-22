from django.db.migrations.operations.models import DeleteModel
from django.http.response import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework import status

from api.helper import parse_info
from api.models import Passage, Topic
from api.serializers import PassageSerializer, TopicSerializer

# Create your views here.


@api_view(['GET'])
def get_topics(request):

    serializer = TopicSerializer(Topic.objects.all(), many=True)

    return Response({"topics": serializer.data})


@api_view(['GET'])
def get_result(request):
    try:
        query = request.query_params['q']
        result = parse_info(query)
        return Response(result)
    except:
        return Response({"message": "Query Required"}, status=status.HTTP_400_BAD_REQUEST)


class PassageView(APIView):
    def get_object(self, pk):
        try:
            return Passage.objects.get(pk=pk)
        except Passage.DoesNotExist:
            raise Http404

    def get(self, request, id=None):
        if (id):
            passage = self.get_object(id)
            serializer = PassageSerializer(passage)
            return Response(serializer.data)

        else:
            try:
                topic = Topic.objects.get(title=request.query_params['topic'])
                passages = Passage.objects.filter(topic=topic)
                serializer = PassageSerializer(passages, many=True)
                return Response({"passages": serializer.data})
            except:
                passages = Passage.objects.all()
                serializer = PassageSerializer(passages, many=True)
                return Response({"passages": serializer.data})

    def post(self, request, id=None):
        serializer = PassageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"error": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            passage = Passage.objects.get(pk=id)
            serializer = PassageSerializer(passage, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({"error": serializer.data}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Passage not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id=None):
        try:
            passage = Passage.objects.get(pk=id)
            serializer = PassageSerializer(passage)
            passage.delete()
            return Response(serializer.data)
        except:
            return Response({"error": "Passage not found"}, status=status.HTTP_404_NOT_FOUND)
