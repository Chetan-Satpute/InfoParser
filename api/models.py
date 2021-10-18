from django.db import models

# Create your models here.


class Topic(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Passage(models.Model):
    content = models.TextField()
    title = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self):
        return self.content
