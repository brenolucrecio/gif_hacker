from django.views.generic import View
from django.shortcuts import render
from django.core import serializers
from .models import Item
from django.http import HttpResponse
from django.http import JsonResponse
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_protect

# Create your views here.

def home(request):
    return render(request, 'index.html')

class  ItemForm(forms.ModelForm):
    class  Meta:
        model = Item
        fields =  '__all__'

class  ItemList(View):
    def  get(self, request):
        items =  list(Item.objects.all().values())
        data =  dict()
        data['items'] = items
        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class  ItemCreate(View):
    def  post(self, request):
        data = request.POST

        url = data.get('url','')
        score = data.get('score', '')

        item = Item.objects.create(url = url, score = score)
        item.save()
        return JsonResponse(data)

class  ItemUpdate(View):
    def  post(self, request, pk):
        data =  dict()
        item = Item.objects.get(pk=pk)
        form = ItemForm(instance=item, data=request.POST)
        if form.is_valid():
            item = form.save()
            data['item'] = model_to_dict(item)
        else:
            data['error'] =  "form not valid!"
        return JsonResponse(data)