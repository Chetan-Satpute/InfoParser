# Generated by Django 3.2.8 on 2021-10-19 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_title_passage_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='title',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]