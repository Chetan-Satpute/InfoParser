from rest_framework import serializers

from api.models import Passage, Topic


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class PassageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passage
        fields = "__all__"
