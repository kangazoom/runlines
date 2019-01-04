"""mobileBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path
# from rest_framework import routers
# from django.conf.urls import include, url
# from input_lines.views import fetch_input_lines
#
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('fetch_input_lines/', fetch_input_lines)
#
# ]


# from django.conf.urls import include, url
#
# from rest_framework.authtoken.views import obtain_auth_token
#
#
# urlpatterns = [
#     url(r'^api/token/', obtain_auth_token, name='api-token'),
# ]

from django.conf.urls import include, url

# from rest_framework.authtoken.views import obtain_auth_token

from input_lines.urls import router


urlpatterns = [
    # url(r'^api/token/', obtain_auth_token, name='api-token'),
    url(r'^api/', include(router.urls)),
]
