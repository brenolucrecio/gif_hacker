# Generated by Django 3.1.1 on 2020-09-13 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loeffa_gif', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
